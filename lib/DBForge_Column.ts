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

    /**
     * Constructor of DBForgeColumn
     * @param {string} name Name of the column
     */
    constructor(name: string) {
        this.nameCol = name;
        this.varchar();
    }

    /**
     * Set the type of the column manually. The constraints can be a list of constraints.
     * If possible avoid using this method and prefer the other methods with predefined constraints.
     * @param {string} type The type of the column
     * @param  {...(string|number)} constraints The constraints of the type
     * @returns {this}
     */
    type(type: string, ...constraints: (string | number)[]): this {
        this.typeCol = type.toUpperCase();
        if (constraints.length !== 0) {
            this.typeCol += `(${constraints.join(",")})`;
        }
        return this;
    }

    /**
     * Set the type of the column to boolean. If no default value is given, it will be `false`. It will also make the column unsigned.
     * @param {boolean} [defaultVal=false] The default value of the column
     * @returns {this}
     */
    bool(defaultVal: boolean = false): this {
        return this.type("tinyint", 1)
            .unsigned()
            .defaultValue(defaultVal ? 1 : 0);
    }

    /**
     * Set the type of the column to int. The prefix can be one of the following: `TINY`, `SMALL`, `MEDIUM`, `BIG`.
     * If no prefix is given, it will be `INT` by default.
     * @param {"" | "TINY" | "SMALL" | "MEDIUM" | "BIG"} [prefix=""] The prefix of the type
     * @returns {this}
     */
    int(prefix: "" | "TINY" | "SMALL" | "MEDIUM" | "BIG" = ""): this {
        return this.type(prefix + "int");
    }

    /**
     * Set the type of the column to float.
     * @returns {this}
     */
    float(): this {
        return this.type("float");
    }

    /**
     * Set the type of the column to decimal. If no precision is given, it will be `10`. If no scale is given, it will be `2`.
     * @param {number} [precision=10] The precision of the decimal
     * @param {number} [scale=2] The scale of the decimal
     * @returns {this}
     */
    decimal(precision: number = 10, scale: number = 2): this {
        return this.type("decimal", precision, scale);
    }

    /**
     * Set the type of the column to char. The length given will be the length of the char.
     * @param {number} len The length of the char
     * @returns {this}
     */
    char(len: number): this {
        return this.type("char", len);
    }

    /**
     * Set the type of the column to varchar. If no length is given, it will be `255`.
     * @param {number} [len=255] The length of the varchar
     * @returns {this}
     */
    varchar(len: number = 255): this {
        return this.type("varchar", len);
    }

    /**
     * Set the type of the column to text. The prefix can be one of the following: `TINY`, `MEDIUM`, `LONG`.
     * If no prefix is given, it will be `TEXT` by default.
     * @param {"" | "TINY" | "MEDIUM" | "LONG"} [prefix=""] The prefix of the type
     * @returns {this}
     */
    text(prefix: "" | "TINY" | "MEDIUM" | "LONG" = ""): this {
        return this.type(prefix + "text");
    }

    /**
     * Set the type of the column to blob. The prefix can be one of the following: `TINY`, `MEDIUM`, `LONG`.
     * If no prefix is given, it will be `BLOB` by default.
     * @param {"" | "TINY" | "MEDIUM" | "LONG"} [prefix=""] The prefix of the type
     * @returns {this}
     */
    blob(prefix: "" | "TINY" | "MEDIUM" | "LONG" = ""): this {
        return this.type(prefix + "blob");
    }

    /**
     * Set the type of the column to timestamp.
     * @returns {this}
     */
    timestamp(): this {
        return this.type("timestamp");
    }

    /**
     * Set the type of the column to datetime.
     * @returns {this}
     */
    datetime(): this {
        return this.type("datetime");
    }

    /**
     * Set the type of the column to date.
     * @returns {this}
     */
    date(): this {
        return this.type("date");
    }

    /**
     * Set the type of the column to time.
     * @returns {this}
     */
    time(): this {
        return this.type("time");
    }

    /**
     * Make the column unsigned. By default, it will be `true`.
     * @param {boolean} [value=true] Specifies whether the column should be unsigned.
     * @returns {this}
     */
    unsigned(value: boolean = true): this {
        this.unsignedCol = value;
        return this;
    }

    /**
     * Make the column not nullable. By default, it will be `false`.
     * @returns {this}
     */
    notNull(): this {
        this.notNullCol = true;
        return this;
    }

    /**
     * Set the default value of the column. If quote is set to true, strings will be quoted.
     * @param {any} value The default value of the column
     * @param {boolean} [quote=true] Specifies whether the value should be quoted
     * @returns {this}
     */
    defaultValue(value: any, quote: boolean = true): this {
        if (quote && typeof value === "string") {
            this.defaultCol =
                value !== "" ? "'" + value.replaceAll("'", "''") + "'" : "``";
        } else {
            this.defaultCol = value;
        }

        return this.notNull();
    }

    /**
     * Set the default value of the column to the current timestamp. If onUpdate is set to true, the column will also be set to the current timestamp on update.
     * @param {boolean} [onUpdate=false] Specifies whether the column should be set to the current timestamp on update
     * @returns {this}
     */
    defaultTimestamp(onUpdate: boolean = false): this {
        return this.defaultValue(
            "CURRENT_TIMESTAMP" +
                (onUpdate ? " ON UPDATE CURRENT_TIMESTAMP" : ""),
            false
        );
    }

    /**
     * Make the column auto increment. By default, it will be `true`. If value is set to `false`, the column will not be auto increment.
     * @param {boolean} [value=true] Specifies whether the column should be auto increment
     * @returns {this}
     */
    autoIncrement(value: boolean = true): this {
        this.autoIncrementCol = value;
        return this.notNull();
    }

    /**
     * Set a comment for the column. The comment will be quoted.
     * Single quotes within the comment will be escaped.
     * @param {string} value The comment to set for the column.
     * @returns {this}
     */
    comment(value: string): this {
        this.commentCol =
            value !== "" ? "'" + value.replaceAll("'", "''") + "'" : "''";
        return this;
    }

    /**
     * Add the column at the first position in the table.
     * @returns {this}
     */
    first(): this {
        this.firstCol = true;
        return this;
    }

    /**
     * Add the column after the column with the given name.
     * @param {string} name The name of the column to add the new column after.
     * @returns {this}
     */
    after(name: string): this {
        this.afterCol = name;
        return this;
    }

    /**
     * Converts the column to a string in the format of a MySQL column definition.
     * @returns {string} The string representation of the column.
     */
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
