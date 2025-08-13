import util from "node:util";
import DBForgeColumn from "./DBForge_Column";

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

    /**
     * Create a new DBForge object.
     * @returns {DBForge} a new DBForge object.
     */
    static create(): DBForge {
        return new DBForge();
    }

    /**
     * Reset the DBForge object. After each request, the DBForge object is also automatically reset.
     * @returns {this} the same DBForge object.
     */
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

    /**
     * Create a new database with the specified name if it does not already exist.
     * @param {string} name - The name of the database to create.
     * @returns {string} The SQL query statement for creating the database.
     */
    createDataBase(name: string): string {
        return this.query(`CREATE DATABASE IF NOT EXISTS \`${name}\`;`);
    }

    /**
     * Drop a database with the specified name if it exists.
     * @param {string} name - The name of the database to drop.
     * @returns {string} The SQL query statement for dropping the database.
     */
    dropDataBase(name: string): string {
        return this.query(`DROP DATABASE IF EXISTS \`${name}\`;`);
    }

    /**
     * Create a new table with the specified name and optional comment.
     * @param {string} name - The name of the table to create.
     * @param {string} [comment=""] - The comment for the table.
     * @returns {string} The SQL query statement for creating the table.
     */
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

    /**
     * Drop a table with the specified name if it exists.
     * @param {string} name - The name of the table to drop.
     * @returns {string} The SQL query statement for dropping the table.
     */
    dropTable(name: string): string {
        name = this.quoteIdentifier(name);
        return this.query(`DROP TABLE IF EXISTS ${name};`);
    }

    /**
     * Rename a table from the old name to the new name.
     * @param {string} from - The current name of the table to rename.
     * @param {string} to - The new name for the table.
     * @returns {string} The SQL query statement for renaming the table.
     */
    renameTable(from: string, to: string): string {
        from = this.quoteIdentifier(from);
        to = this.quoteIdentifier(to);
        return this.query(`ALTER TABLE ${from} RENAME TO ${to};`);
    }

    /**
     * Alter a table with the specified name.
     * This function can be used to drop, add or modify columns, as well as add or drop indexes and foreign keys.
     * @param {string} name - The name of the table to alter.
     * @returns {string} The SQL query statement for altering the table.
     */
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

    /**
     * Add a new column to the table with the given name.
     * If a callback is given, it will be called with the new column as an argument.
     * @param {string} name - The name of the column to add.
     * @param {null | ((col: DBForgeColumn) => void)} [callback] - A callback to run with the new column.
     * @returns {this}
     */
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

    /**
     * Drop a column with the given name.
     * @param {string} name The name of the column to drop.
     * @returns {this}
     */
    dropColumn(name: string): this {
        this.columns.drop.push(name);
        return this;
    }

    /**
     * Change a column with the given new name and configuration. If no new name 
     * is provided, the column will retain its original name. If a callback is 
     * provided, it will be called to configure the column
     * @param {string} name - The current name of the column.
     * @param {string} [newName] - The new name for the column.
     * @param {null | ((col: DBForgeColumn) => void)} callback - A callback to 
     * configure the column.
     * @returns {this}
     */
    changeColumn(
        name: string,
        newName: string = "",
        callback: null | ((col: DBForgeColumn) => void)
    ): this {
        if (newName === "") newName = name;

        let col = new DBForgeColumn(newName);
        this.columns.change.push({ name, col });
        if (callback !== null) {
            callback(col);
        }
        return this;
    }

    /**
     * Add a primary key to the table with the given column names.
     * @param {...string} names - The names of the columns to add as primary key.
     * @returns {this}
     */
    addPrimary(...names: string[]): this {
        for (const name of names) {
            this.primary.add.push(`\`${name}\``);
        }
        return this;
    }

    /**
     * Drop the primary key of the table.
     * @returns {this}
     */
    dropPrimary(): this {
        this.primary.drop = true;
        return this;
    }

    /**
     * Add an index to the table with the given name and configuration.
     * @param {string} name - The name of the index to add.
     * @param {{ name: string; asc?: boolean }[]} [cols] - The columns to add 
     * as the index.
     * @returns {this}
     */
    addIndex(name: string, cols: { name: string; asc?: boolean }[] = []): this {
        this.keys.add.push(this.buildKey(name, false, cols));
        return this;
    }

    /**
     * Add an unique index to the table with the given name and configuration.
     * @param {string} name - The name of the unique index to add.
     * @param {{ name: string; asc?: boolean }[]} [cols] - The columns to add 
     * as the index.
     * @returns {this}
     */
    addUnique(
        name: string,
        cols: { name: string; asc?: boolean }[] = []
    ): this {
        this.keys.add.push(this.buildKey(name, true, cols));
        return this;
    }

    /**
     * Drop the index with the given name.
     * @param {string} name - The name of the index to drop.
     * @returns {this}
     */
    dropIndex(name: string): this {
        this.keys.drop.push(name + "_idx");
        return this;
    }

    /**
     * Drop the unique index with the given name.
     * @param {string} name - The name of the unique index to drop.
     * @returns {this}
     */
    dropUnique(name: string): this {
        this.keys.drop.push(name + "_unq");
        return this;
    }

    /**
     * Add a foreign key constraint to the table.
     * @param {string} field - The field in the table to create the foreign key
     * on.
     * @param {string} target - The table and field to reference. Should be in the
     * form of "table_name.field_name".
     * @param {string} [del="CASCADE"] - The action to take when a row is deleted
     * from the referenced table.
     * @param {string} [update="CASCADE"] - The action to take when a row is updated
     * in the referenced table.
     * @returns {this}
     */
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

    /**
     * Add an index to the foreign key with the field given.
     * This is a shortcut for `addIndex(field + "_fk", [{ name: field, asc: true }])`
     * @param {string} field - The field of the foreign key to add the index to.
     * @returns {this}
     */
    addFkIndex(field: string): this {
        return this.addIndex(field + "_fk", [{ name: field, asc: true }]);
    }

    /**
     * Drop the foreign key constraint with the given field.
     * @param {string} field - The field of the foreign key to drop.
     * @returns {this}
     */
    dropFk(field: string): this {
        this.foreign.drop.push(field);
        return this;
    }

    /**
     * Drop the index on the foreign key with the given field.
     * This is a shortcut for `dropIndex(field + "_fk")`
     * @param {string} field - The field of the foreign key to drop the index from.
     * @returns {this}
     */
    dropFkIndex(field: string): this {
        return this.dropIndex(field + "_fk");
    }

    /**
     * Build an index from the given configuration.
     * @param {string} name - The name of the index.
     * @param {boolean} unique - Whether the index should be unique.
     * @param {{ name: string; asc?: boolean }[]} cols - The columns to add as the index.
     * @returns {{ name: string; unique: boolean; colums: string }} - The index configuration.
     */
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

    /**
     * Quote the given database and table name.
     * @param {object} names - The database and table name to quote.
     * @param {string} names.db - The database name.
     * @param {string} names.table - The table name.
     * @returns {string} The quoted database and table name.
     */
    private quoteName(names: { db: string; table: string }): string {
        if (names.db !== "") return `\`${names.db}\`.\`${names.table}\``;
        return `\`${names.table}\``;
    }

    /**
     * Quote the given identifier (column or table name) by splitting it into its database and table name parts, and then quoting each part.
     * @param {string} field - The identifier to quote.
     * @returns {string} The quoted identifier.
     */
    private quoteIdentifier(field: string): string {
        return this.quoteName(this.explodeName(field));
    }

    /**
     * Explode the given identifier (column or table name) into its database and table name parts.
     * If the identifier doesn't contain a dot, it will be considered as a table name.
     * @param {string} name - The identifier to explode.
     * @returns {{ db: string; table: string }} - The exploded identifier. The "db" property is the database name, and the "table" property is the table name.
     */
    private explodeName(name: string): { db: string; table: string } {
        let splited: string[] = name.split(".");
        if (splited.length === 1) {
            return { db: "", table: splited[0] };
        }
        return { db: splited[0], table: splited[1] };
    }

    /**
     * Quote the given value by replacing single quotes with double quotes and
     * enclosing it in single quotes.
     * @param {string} value - The value to quote.
     * @returns {string} The quoted value.
     */
    private quote(value: string): string {
        return "'" + value.replaceAll("'", "''") + "'";
    }

    /**
     * Resets the alter table configuration and returns the given statment.
     * @param {string} statment - The statment to return.
     * @returns {string} The given statment.
     */
    private query(statment: string): string {
        this.reset();
        return statment;
    }
}
