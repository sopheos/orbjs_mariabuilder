export default class DBForgeColumn {
    protected nameCol: string;
    protected typeCol: string = "";
    protected unsignedCol: boolean = false;
    protected autoIncrementCol: boolean = false;
    protected notNullCol: boolean = false;
    protected defaultCol: any = null;
    protected afterCol: string = "";
    protected firstCol: boolean = false;
    protected commentCol: string = "";

    constructor(name: string) {
        this.nameCol = name;
        this.varchar();
    }

    type(type: string, ...constraints: (string | number)[]): this {
        this.typeCol = type.toUpperCase();
        if (constraints.length !== 0) {
            this.typeCol += `(${constraints.join(",")})`;
        }
        return this;
    }

    bool(defaultVal: boolean = false): this {
        return this.type("tinyint", 1)
            .unsigned()
            .defaultValue(defaultVal ? 1 : 0);
    }

    int(prefix: "" | "TINY" | "SMALL" | "MEDIUM" | "BIG" = ""): this {
        return this.type(prefix + "int");
    }

    float(): this {
        return this.type("float");
    }

    decimal(precision: number = 10, scale: number = 2): this {
        return this.type("decimal", precision, scale);
    }

    char(len: number): this {
        return this.type("char", len);
    }

    varchar(len: number = 255): this {
        return this.type("varchar", len);
    }

    text(prefix: "" | "TINY" | "MEDIUM" | "LONG" = ""): this {
        return this.type(prefix + "text");
    }

    blob(prefix: "" | "TINY" | "MEDIUM" | "LONG" = ""): this {
        return this.type(prefix + "blob");
    }

    timestamp(): this {
        return this.type("timestamp");
    }

    datetime(): this {
        return this.type("datetime");
    }

    date(): this {
        return this.type("date");
    }

    time(): this {
        return this.type("time");
    }

    unsigned(value: boolean = true): this {
        this.unsignedCol = value;
        return this;
    }

    notNull(): this {
        this.notNullCol = true;
        return this;
    }

    defaultValue(value: any, quote: boolean = true): this {
        if (quote && typeof value === "string") {
            this.defaultCol =
                value !== "" ? "'" + value.replaceAll("'", "''") + "'" : "``";
        } else {
            this.defaultCol = value;
        }

        return this.notNull();
    }

    defaultTimestamp(onUpdate: boolean = false): this {
        return this.defaultValue(
            "CURRENT_TIMESTAMP" +
                (onUpdate ? " ON UPDATE CURRENT_TIMESTAMP" : ""),
            false
        );
    }

    autoIncrement(value: boolean = true): this {
        this.autoIncrementCol = value;
        return this.notNull();
    }

    comment(value: string): this {
        this.commentCol =
            value !== "" ? "'" + value.replaceAll("'", "''") + "'" : "''";
        return this;
    }

    first(): this {
        this.firstCol = true;
        return this;
    }

    after(name: string): this {
        this.afterCol = name;
        return this;
    }

    toString(): string {
        let str = `\`${this.nameCol}\` ${this.typeCol}`;

        if (this.unsignedCol) {
            str += " UNSIGNED";
        }

        if (this.notNullCol) {
            str += " NOT NULL";
        } else {
            str += " NULL DEFAULT NULL";
        }

        if (this.autoIncrementCol) {
            str += " AUTO_INCREMENT";
        } else if (this.defaultCol !== null) {
            str += ` DEFAULT ${this.defaultCol}`;
        }

        if (this.commentCol) {
            str += ` COMMENT ${this.commentCol}`;
        }

        if (this.firstCol) {
            str += " FIRST";
        } else if (this.afterCol !== "") {
            str += ` AFTER \`${this.afterCol}\``;
        }

        return str;
    }
}
