import util from "node:util";
import DBForgeColumn from "#/DBForge_Column";

export default class DBForge {
    private columns: {
        add: DBForgeColumn[];
        drop: string[];
        change: {
            name: string;
            col: DBForgeColumn;
        }[];
    } = {add: [], drop: [], change: []};

    private primary: {
        add: string[];
        drop: boolean;
    } = {add: [], drop: false};

    private keys: {
        add: {
            name: string;
            unique: boolean;
            colums: string;
        }[];
        drop: string[];
    } = {add:[], drop:[]};

    private foreign: {
        add: string[];
        drop: string[];
    } = {add: [], drop: []};

    private statment: string = "";

    static create(): DBForge {
        return new DBForge();
    }

    reset(): this {
        this.columns = {
            add: [],
            drop: [],
            change: [],
        };

        this.primary = {
            add: [],
            drop: false,
        };

        this.keys = {
            add: [],
            drop: [],
        };

        this.foreign = {
            add: [],
            drop: [],
        };

        this.statment = "";

        return this;
    }

    createDataBase(name: string): string {
        return this.query(`CREATE DATABASE IF NOT EXISTS \`${name}\`;`);
    }

    dropDataBase(name: string): string {
        return this.query(`DROP DATABASE IF EXISTS \`${name}\`;`);
    }

    createTable(name: string, comment: string = ""): string {
        let names: { db: string; table: string } = this.explodeName(name);
        let tmp: string = "";
        let rows: string[] = [];

        for (const col of this.columns.add) {
            rows.push(col.toString());
        }

        if (this.primary.add.length !== 0) {
            tmp = this.primary.add.join(",");
            rows.push(`PRIMARY KEY (${tmp})`);
        }

        for (const key of this.keys.add) {
            let lbl: string = key.unique ? "UNIQUE INDEX" : "INDEX";
            let suf = key.unique ? "unq" : "idx";
            rows.push(
                `${lbl} \`${names.table}_${key.name}_${suf}\` (${key.colums})`
            );
        }

        for (const stmt of this.foreign.add) {
            rows.push(
                util.format(
                    stmt,
                    names.table,
                    names.db !== "" ? `\`${names.db}\`.` : ""
                )
            );
        }

        this.statment =
            "CREATE TABLE IF NOT EXISTS " +
            this.quoteName(names) +
            " (\n\t" +
            rows.join(",\n\t") +
            "\n)";
        if (comment !== "")
            this.statment += "\n\t COMMENT " + this.quote(comment);
        this.statment += ";";
        return this.query(this.statment);
    }

    dropTable(name: string): string {
        name = this.quoteIdentifier(name);
        return this.query(`DROP TABLE IF EXISTS ${name};`);
    }

    renameTable(from: string, to: string): string {
        from = this.quoteIdentifier(from);
        to = this.quoteIdentifier(to);
        return this.query(`ALTER TABLE ${from} RENAME TO ${to};`);
    }

    alterTable(name: string): string {
        let names: { db: string; table: string } = this.explodeName(name);
        let tmp: string = "";
        let rows: string[] = [];

        for (const col of this.columns.drop) {
            rows.push(`DROP COLUMN \`${col}\``);
        }

        for (const col of this.columns.add) {
            rows.push(`ADD COLUMN ${col.toString()}`);
        }

        for (const col of this.columns.change) {
            rows.push(`CHANGE COLUMN \`${col.name}\` ${col.col.toString()}`);
        }

        if (this.primary.drop) {
            rows.push("DROP PRIMARY KEY");
        }

        if (this.primary.add.length !== 0) {
            tmp = this.primary.add.join(",");
            rows.push(`ADD PRIMARY KEY (${tmp})`);
        }

        for (const key of this.keys.drop) {
            rows.push(`DROP INDEX \`${names.table}_${key}\``);
        }

        for (const key of this.keys.add) {
            let lbl: string = key.unique ? "UNIQUE INDEX" : "INDEX";
            let suf = key.unique ? "unq" : "idx";
            rows.push(
                `ADD ${lbl} \`${names.table}_${key.name}_${suf}\` (${key.colums})`
            );
        }

        for (const fk of this.foreign.drop) {
            rows.push(`DROP FOREIGN KEY \`${names.table}_${fk}_fk\``);
        }

        for (const stmt of this.foreign.add) {
            rows.push(
                "ADD " +
                    util.format(
                        stmt,
                        names.table,
                        names.db !== "" ? `\`${names.db}\`.` : ""
                    )
            );
        }

        this.statment =
            "ALTER TABLE " +
            this.quoteName(names) +
            " \n\t" +
            rows.join(",\n\t") +
            ";";
        return this.query(this.statment);
    }

    addColumn(
        name: string,
        callback: null | ((col: DBForgeColumn) => void)
    ): this {
        let col = new DBForgeColumn(name);
        this.columns.add.push(col);
        if (callback !== null) {
            callback(col);
        }
        return this;
    }

    dropColumn(name: string): this {
        this.columns.drop.push(name);
        return this;
    }

    changeColumn(
        name: string,
        new_name: string = "",
        callback: null | ((col: DBForgeColumn) => void)
    ): this {
        if (new_name === "") new_name = name;

        let col = new DBForgeColumn(new_name);
        this.columns.change.push({ name, col });
        if (callback !== null) {
            callback(col);
        }
        return this;
    }

    addPrimary(...names: string[]): this {
        for (const name of names) {
            this.primary.add.push(`\`${name}\``);
        }
        return this;
    }

    dropPrimary(): this {
        this.primary.drop = true;
        return this;
    }

    addIndex(name: string, cols: { name: string; asc?: boolean }[] = []): this {
        this.keys.add.push(this.buildKey(name, false, cols));
        return this;
    }

    addUnique(
        name: string,
        cols: { name: string; asc?: boolean }[] = []
    ): this {
        this.keys.add.push(this.buildKey(name, true, cols));
        return this;
    }

    dropIndex(name: string): this {
        this.keys.drop.push(name + "_idx");
        return this;
    }

    dropUnique(name: string): this {
        this.keys.drop.push(name + "_unq");
        return this;
    }

    addFk(
        field: string,
        target: string,
        del: string = "CASCADE",
        update: string = "CASCADE"
    ): this {
        const target_array: string[] = target.split(".");

        if (target_array.length !== 2) {
            throw new Error(`${target} is not a valid target`);
        }

        const tmp: string =
            `CONSTRAINT \`%s_${field}_fk\`` +
            ` FOREIGN KEY (\`${field}\`)` +
            ` REFERENCES %s\`${target_array[0]}\` (\`${target_array[1]}\`)` +
            ` ON DELETE ${del}` +
            ` ON UPDATE ${update}`;

        this.foreign.add.push(tmp);
        return this;
    }

    addFkIndex(field: string): this {
        return this.addIndex(field + "_fk", [{ name: field, asc: true }]);
    }

    dropFk(field: string): this {
        this.foreign.drop.push(field);
        return this;
    }

    dropFkIndex(field: string): this {
        return this.dropIndex(field + "_fk");
    }

    private buildKey(
        name: string,
        unique: boolean,
        cols: { name: string; asc?: boolean }[]
    ): {
        name: string;
        unique: boolean;
        colums: string;
    } {
        if (cols.length === 0) {
            cols.push({ name, asc: true });
        }

        let tmp: string[] = [];

        for (const col of cols) {
            tmp.push(`\`${col.name}\` ` + (col.asc ?? true ? "ASC" : "DESC"));
        }

        return {
            name,
            unique,
            colums: tmp.join(","),
        };
    }

    private quoteName(names: { db: string; table: string }): string {
        if (names.db !== "") return `\`${names.db}\`.\`${names.table}\``;
        return `\`${names.table}\``;
    }

    private quoteIdentifier(field: string): string {
        return this.quoteName(this.explodeName(field));
    }

    private explodeName(name: string): { db: string; table: string } {
        let splited: string[] = name.split(".");
        if (splited.length === 1) {
            return { db: "", table: splited[0] };
        }
        return { db: splited[0], table: splited[1] };
    }

    private quote(value: string): string {
        return "'" + value.replaceAll("'", "''") + "'";
    }

    private query(statment: string): string {
        this.reset();
        return statment;
    }
}
