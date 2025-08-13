import { Pool, Connection } from "mariadb/*";

export class DBForgeColumn {
    /**
     * Constructor of DBForgeColumn
     * @param {string} name Name of the column
     */
    constructor(name: string);

    /**
     * Set the type of the column manually. The constraints can be a list of constraints.
     * If possible avoid using this method and prefer the other methods with predefined constraints.
     * @param {string} type The type of the column
     * @param  {...(string|number)} constraints The constraints of the type
     * @returns {this}
     */
    type(type: string, ...constraints: (string | number)[]): this;

    /**
     * Set the type of the column to boolean. If no default value is given, it will be `false`. It will also make the column unsigned.
     * @param {boolean} [defaultVal=false] The default value of the column
     * @returns {this}
     */
    bool(defaultVal: boolean): this;

    /**
     * Set the type of the column to int. The prefix can be one of the following: `TINY`, `SMALL`, `MEDIUM`, `BIG`.
     * If no prefix is given, it will be `INT` by default.
     * @param {"" | "TINY" | "SMALL" | "MEDIUM" | "BIG"} [prefix=""] The prefix of the type
     * @returns {this}
     */
    int(prefix: "" | "TINY" | "SMALL" | "MEDIUM" | "BIG"): this;
    /**
     * Set the type of the column to float.
     * @returns {this}
     */
    float(): this;

    /**
     * Set the type of the column to decimal. If no precision is given, it will be `10`. If no scale is given, it will be `2`.
     * @param {number} [precision=10] The precision of the decimal
     * @param {number} [scale=2] The scale of the decimal
     * @returns {this}
     */
    decimal(precision: number, scale: number): this;

    /**
     * Set the type of the column to char. The length given will be the length of the char.
     * @param {number} len The length of the char
     * @returns {this}
     */
    char(len: number): this;

    /**
     * Set the type of the column to varchar. If no length is given, it will be `255`.
     * @param {number} [len=255] The length of the varchar
     * @returns {this}
     */
    varchar(len: number): this;

    /**
     * Set the type of the column to text. The prefix can be one of the following: `TINY`, `MEDIUM`, `LONG`.
     * If no prefix is given, it will be `TEXT` by default.
     * @param {"" | "TINY" | "MEDIUM" | "LONG"} [prefix=""] The prefix of the type
     * @returns {this}
     */
    text(prefix: "" | "TINY" | "MEDIUM" | "LONG"): this;

    /**
     * Set the type of the column to blob. The prefix can be one of the following: `TINY`, `MEDIUM`, `LONG`.
     * If no prefix is given, it will be `BLOB` by default.
     * @param {"" | "TINY" | "MEDIUM" | "LONG"} [prefix=""] The prefix of the type
     * @returns {this}
     */
    blob(prefix: "" | "TINY" | "MEDIUM" | "LONG"): this;
    /**
     * Set the type of the column to timestamp.
     * @returns {this}
     */
    timestamp(): this;
    /**
     * Set the type of the column to datetime.
     * @returns {this}
     */
    datetime(): this;

    /**
     * Set the type of the column to date.
     * @returns {this}
     */
    date(): this;

    /**
     * Set the type of the column to time.
     * @returns {this}
     */
    time(): this;

    /**
     * Make the column unsigned. By default, it will be `true`.
     * @param {boolean} [value=true] Specifies whether the column should be unsigned.
     * @returns {this}
     */
    unsigned(value: boolean): this;

    /**
     * Make the column not nullable. By default, it will be `false`.
     * @returns {this}
     */
    notNull(): this;

    /**
     * Set the default value of the column. If quote is set to true, strings will be quoted.
     * @param {any} value The default value of the column
     * @param {boolean} [quote=true] Specifies whether the value should be quoted
     * @returns {this}
     */
    defaultValue(value: any, quote: boolean): this;

    /**
     * Set the default value of the column to the current timestamp. If onUpdate is set to true, the column will also be set to the current timestamp on update.
     * @param {boolean} [onUpdate=false] Specifies whether the column should be set to the current timestamp on update
     * @returns {this}
     */
    defaultTimestamp(onUpdate: boolean): this;

    /**
     * Make the column auto increment. By default, it will be `true`. If value is set to `false`, the column will not be auto increment.
     * @param {boolean} [value=true] Specifies whether the column should be auto increment
     * @returns {this}
     */
    autoIncrement(value: boolean): this;

    /**
     * Set a comment for the column. The comment will be quoted.
     * Single quotes within the comment will be escaped.
     * @param {string} value The comment to set for the column.
     * @returns {this}
     */
    comment(value: string): this;

    /**
     * Add the column at the first position in the table.
     * @returns {this}
     */
    first(): this;

    /**
     * Add the column after the column with the given name.
     * @param {string} name The name of the column to add the new column after.
     * @returns {this}
     */
    after(name: string): this;
}

export class DBForge {

    /**
     * Reset the DBForge object. After each request, the DBForge object is also automatically reset.
     * @returns {this} the same DBForge object.
     */
    reset(): this;

    /**
     * Create a new database with the specified name if it does not already exist.
     * @param {string} name - The name of the database to create.
     * @returns {string} The SQL query statement for creating the database.
     */
    createDataBase(name: string): string;

    /**
     * Drop a database with the specified name if it exists.
     * @param {string} name - The name of the database to drop.
     * @returns {string} The SQL query statement for dropping the database.
     */
    dropDataBase(name: string): string;

    /**
     * Create a new table with the specified name and optional comment.
     * @param {string} name - The name of the table to create.
     * @param {string} [comment=""] - The comment for the table.
     * @returns {string} The SQL query statement for creating the table.
     */
    createTable(name: string, comment: string): string;

    /**
     * Drop a table with the specified name if it exists.
     * @param {string} name - The name of the table to drop.
     * @returns {string} The SQL query statement for dropping the table.
     */
    dropTable(name: string): string;

    /**
     * Rename a table from the old name to the new name.
     * @param {string} from - The current name of the table to rename.
     * @param {string} to - The new name for the table.
     * @returns {string} The SQL query statement for renaming the table.
     */
    renameTable(from: string, to: string): string;

    /**
     * Alter a table with the specified name.
     * This function can be used to drop, add or modify columns, as well as add or drop indexes and foreign keys.
     * @param {string} name - The name of the table to alter.
     * @returns {string} The SQL query statement for altering the table.
     */
    alterTable(name: string): string;

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
    ): this;

    /**
     * Drop a column with the given name.
     * @param {string} name The name of the column to drop.
     * @returns {this}
     */
    dropColumn(name: string): this;

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
        newName: string,
        callback: null | ((col: DBForgeColumn) => void)
    ): this;

    /**
     * Add a primary key to the table with the given column names.
     * @param {...string} names - The names of the columns to add as primary key.
     * @returns {this}
     */
    addPrimary(...names: string[]): this;

    /**
     * Drop the primary key of the table.
     * @returns {this}
     */
    dropPrimary(): this;

    /**
     * Add an index to the table with the given name and configuration.
     * @param {string} name - The name of the index to add.
     * @param {{ name: string; asc?: boolean }[]} [cols] - The columns to add 
     * as the index.
     * @returns {this}
     */
    addIndex(name: string, cols: { name: string; asc?: boolean }[]): this

    /**
     * Add an unique index to the table with the given name and configuration.
     * @param {string} name - The name of the unique index to add.
     * @param {{ name: string; asc?: boolean }[]} [cols] - The columns to add 
     * as the index.
     * @returns {this}
     */
    addUnique(
        name: string,
        cols: { name: string; asc?: boolean }[]
    ): this

    /**
     * Drop the index with the given name.
     * @param {string} name - The name of the index to drop.
     * @returns {this}
     */
    dropIndex(name: string): this

    /**
     * Drop the unique index with the given name.
     * @param {string} name - The name of the unique index to drop.
     * @returns {this}
     */
    dropUnique(name: string): this

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
        del: string,
        update: string
    ): this

    /**
     * Add an index to the foreign key with the field given.
     * This is a shortcut for `addIndex(field + "_fk", [{ name: field, asc: true }])`
     * @param {string} field - The field of the foreign key to add the index to.
     * @returns {this}
     */
    addFkIndex(field: string): this

    /**
     * Drop the foreign key constraint with the given field.
     * @param {string} field - The field of the foreign key to drop.
     * @returns {this}
     */
    dropFk(field: string): this

    /**
     * Drop the index on the foreign key with the given field.
     * This is a shortcut for `dropIndex(field + "_fk")`
     * @param {string} field - The field of the foreign key to drop the index from.
     * @returns {this}
     */
    dropFkIndex(field: string): this
}

export class QBFrag {
    constructor(parent: QB | null);

    /**
     * Returns the parent query builder
     * @returns {QB} the parent query builder
     */
    getParent(): QB;

    /**
     * Returns the SQL statment of the fragment
     * @returns {string} the SQL statment
     */
    getStatement(): string;

    /**
     * Returns the data to be used with the prepared statement
     * @returns {any[]} the data
     */
    getData(): any[];

    /**
     * Replaces the ? in the statment with the actual values
     * @param {Pool | Connection} db the database connection to use
     * @returns {string} the statment with the ? replaced
     */
    debug(db: Pool | Connection): string;
}

export class WhereHaveF {
    /**
     * Initializes a new instance of the `WhereHaveF` class.
     *
     * @param {QB | null} [parent=null] - The parent query builder.
     * @param {string} keyWord - The keyword to use.
     * Used to create and instance of WHERE and HAVE with the same class.
     */
    constructor(parent: QB | null, keyWord: string);

    /**
     * Add a condition to the WHERE/HAVING clause with the AND keyword.
     *
     * @param {string} statment - The condition to be added.
     * @param {...any[]} data - The values to be used in the condition.
     * @returns {this} The current instance to allow for method chaining.
     */
    and(statment: string, ...data: any[]): this;

    /**
     * Add a condition to the WHERE/HAVING clause with the OR keyword.
     *
     * @param {string} statment - The condition to be added.
     * @param {...any[]} data - The values to be used in the condition.
     * @returns {this} The current instance to allow for method chaining.
     */
    or(statment: string, ...data: any[]): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword
     * for checking if the specified statement is NULL.
     *
     * @param {string} statment - The condition to be checked for NULL.
     * @returns {this} The current instance to allow for method chaining.
     */
    andNull(statment: string): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword
     * for checking if the specified statement is NULL.
     *
     * @param {string} statment - The condition to be checked for NULL.
     * @returns {this} The current instance to allow for method chaining.
     */
    orNull(statment: string): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword
     * for checking if the specified statement is NOT NULL.
     *
     * @param {string} statment - The condition to be checked for NOT NULL.
     * @returns {this} The current instance to allow for method chaining.
     */
    andNotNull(statment: string): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword
     * for checking if the specified statement is NOT NULL.
     *
     * @param {string} statment - The condition to be checked for NOT NULL.
     * @returns {this} The current instance to allow for method chaining.
     */
    orNotNull(statment: string): this;
    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified statement is equal to a value. If no value is provided,
     * it checks if the statement is NULL.
     *
     * @param {string} statment - The condition to be checked for equality or NULL.
     * @param {any} data - The values to be compared for equality.
     * @returns {this} The current instance to allow for method chaining.
     */
    andEq(statment: string, data: any): this;
    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified statement is equal to a value. If no value is provided,
     * it checks if the statement is NULL.
     *
     * @param {string} statment - The condition to be checked for equality or NULL.
     * @param {any} data - The values to be compared for equality.
     * @returns {this} The current instance to allow for method chaining.
     */
    orEq(statment: string, data: any): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified statement is not equal to a value. If no value is provided,
     * it checks if the statement is NOT NULL.
     *
     * @param {string} statment - The condition to be checked for inequality or NOT NULL.
     * @param {any} data - The values to be compared for inequality.
     * @returns {this} The current instance to allow for method chaining.
     */
    andNot(statment: string, data: any): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified statement is not equal to a value. If no value is provided,
     * it checks if the statement is NOT NULL.
     *
     * @param {string} statment - The condition to be checked for inequality or NOT NULL.
     * @param {any} data - The values to be compared for inequality.
     * @returns {this} The current instance to allow for method chaining.
     */
    orNot(statment: string, data: any): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified statement is strictly superior to a value.
     *
     * @param {string} statment - The condition to be checked for superiority.
     * @param {any} data - The values to be compared for superiority.
     * @returns {this} The current instance to allow for method chaining.
     */
    andSup(statment: string, data: any): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified statement is strictly superior to a value.
     *
     * @param {string} statment - The condition to be checked for superiority.
     * @param {any} data - The values to be compared for superiority.
     * @returns {this} The current instance to allow for method chaining.
     */
    orSup(statment: string, data: any): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified statement is strictly inferior to a value.
     *
     * @param {string} statment - The condition to be checked for inferiority.
     * @param {any} data - The values to be compared for inferiority.
     * @returns {this} The current instance to allow for method chaining.
     */
    andInf(statment: string, data: any): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified statement is strictly inferior to a value.
     *
     * @param {string} statment - The condition to be checked for inferiority.
     * @param {any} data - The values to be compared for inferiority.
     * @returns {this} The current instance to allow for method chaining.
     */
    orInf(statment: string, data: any): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified statement is superior or equal to a value.
     *
     * @param {string} statment - The condition to be checked for superiority or equality.
     * @param {any} data - The values to be compared for superiority or equality.
     * @returns {this} The current instance to allow for method chaining.
     */
    andSupEq(statment: string, data: any): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified statement is superior or equal to a value.
     *
     * @param {string} statment - The condition to be checked for superiority or equality.
     * @param {any} data - The values to be compared for superiority or equality.
     * @returns {this} The current instance to allow for method chaining.
     */
    orSupEq(statment: string, data: any): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified statement is inferior or equal to a value.
     *
     * @param {string} statment - The condition to be checked for inferiority or equality.
     * @param {any} data - The values to be compared for inferiority or equality.
     * @returns {this} The current instance to allow for method chaining.
     */
    andInfEq(statment: string, data: any): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified statement is inferior or equal to a value.
     *
     * @param {string} statment - The condition to be checked for inferiority or equality.
     * @param {any} data - The values to be compared for inferiority or equality.
     * @returns {this} The current instance to allow for method chaining.
     */
    orInfEq(statment: string, data: any): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified column(s) is in the list of values provided.
     *
     * @param {string | string[]} column - The column name to check, or an array
     *     of columns names to check.
     * @param {any[] | any[][] | QBFrag} values - An array of values to check, or
     *     an array of arrays of values to check, or a query fragment
     *     representing the list of values to check.
     * @returns {this} The current instance to allow for method chaining.
     */
    andIn(column: string | string[], values: any[] | any[][] | QBFrag): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified column(s) is in the list of values provided.
     *
     * @param {string | string[]} column - The column name to check, or an array
     *     of column names to check.
     * @param {any[] | any[][] | QBFrag} values - An array of values to check, or
     *     an array of arrays of values to check, or a query fragment
     *     representing the list of values to check.
     * @returns {this} The current instance to allow for method chaining.
     */
    orIn(column: string | string[], values: any[] | any[][] | QBFrag): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified column(s) is not in the list of values provided.
     *
     * @param {string | string[]} column - The column name to check, or an array
     *     of column names to check.
     * @param {any[] | any[][] | QBFrag} values - An array of values to check, or
     *     an array of arrays of values to check, or a query fragment
     *     representing the list of values to check.
     * @returns {this} The current instance to allow for method chaining.
     */
    andNotIn(
        column: string | string[],
        values: any[] | any[][] | QBFrag
    ): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified column(s) is not in the list of values provided.
     *
     * @param {string | string[]} column - The column name to check, or an array
     *     of column names to check.
     * @param {any[] | any[][] | QBFrag} values - An array of values to check, or
     *     an array of arrays of values to check, or a query fragment
     *     representing the list of values to check.
     * @returns {this} The current instance to allow for method chaining.
     */
    orNotIn(column: string | string[], values: any[] | any[][] | QBFrag): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified column is like the specified value.
     *
     * @param {string} column - The column name to check.
     * @param {string} value - The value to check against.
     * @returns {this} The current instance to allow for method chaining.
     */
    andLike(column: string, value: string): this;
    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified column is like the specified value.
     *
     * @param {string} column - The column name to check.
     * @param {string} value - The value to check against.
     * @returns {this} The current instance to allow for method chaining.
     */
    orLike(column: string, value: string): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified column is not like the specified value.
     *
     * @param {string} column - The column name to check.
     * @param {string} value - The value to check against.
     * @returns {this} The current instance to allow for method chaining.
     */
    andNotLike(column: string, value: string): this;

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified column is not like the specified value.
     *
     * @param {string} column - The column name to check.
     * @param {string} value - The value to check against.
     * @returns {this} The current instance to allow for method chaining.
     */
    orNotLike(column: string, value: string): this;

    /**
     * Starts a new group of conditions with the AND keyword.
     * It should be finalized with a call to `groupEnd`.
     *
     * @returns {this} The current instance to allow for method chaining.
     */
    andGroupStart(): this;

    /**
     * Starts a new group of conditions with the OR keyword.
     * It should be finalized with a call to `groupEnd`.
     *
     * @returns {this} The current instance to allow for method chaining.
     */
    orGroupStart(): this;

    /**
     * Ends the current group of conditions. This method should be called
     * after starting a group with `andGroupStart` or `orGroupStart`.
     *
     * @returns {this} The current instance to allow for method chaining.
     */
    groupEnd(): this;
}

export class OrderByF {
    /**
     * Sets the columns to order by in ascending order
     * @param {...string} column the column(s) to order by
     * @returns {this} The current instance to allow for method chaining.
     */
    asc(...column: string[]): this;

    /**
     * Sets the columns to order by in descending order
     * @param {...string} column the column(s) to order by
     * @returns {this} The current instance to allow for method chaining.
     */
    desc(...column: string[]): this;

    /**
     * Adds a custom ORDER BY clause using CASE statements to the query.
     * Allows for specifying multiple conditions with their respective priorities
     * and an optional default priority when conditions are not met.
     * Priorities are ordered in ascending order.
     *
     * @param {string} [column=""] - The column to apply the CASE statement to.
     * @param {{ condition: string; priority: string | number }[]} when - An array of conditions with their priority values.
     * @param {string | number | null} [defaultPriority=null] - The default priority if no conditions are met.
     * @param {...any[]} data - Additional data for the prepared statement.
     * @returns {this} The current instance to allow for method chaining.
     */
    ascCustom(
        column: string,
        when: { condition: string; priority: string | number }[],
        defaultPriority: string | number | null,
        ...data: any[]
    ): this;

    /**
     * Adds a custom ORDER BY clause using CASE statements to the query.
     * Allows for specifying multiple conditions with their respective priorities
     * and an optional default priority when conditions are not met.
     * Priorities are ordered in descending order.
     *
     * @param {string} [column=""] - The column to apply the CASE statement to.
     * @param {{ condition: string; priority: string | number }[]} when - An array of conditions with their priority values.
     * @param {string | number | null} [defaultPriority=null] - The default priority if no conditions are met.
     * @param {...any[]} data - Additional data for the prepared statement.
     * @returns {this} The current instance to allow for method chaining.
     */
    descCustom(
        column: string,
        when: { condition: string; priority: string | number }[],
        defaultPriority: string | number | null,
        ...data: any[]
    ): this;
}

export class JoinF {
     /**
     * Add an INNER JOIN to the query.
     * @param table The table to join.
     * @param condition The condition to join on.
     * @param values The values for the condition.
     * @returns {this} The current instance to allow for method chaining.
     */
    inner(table: string, condition: string, ...values: any[]): this;

    /**
     * Add a CROSS JOIN to the query.
     * @param table The table to join.
     * @returns {this} The current instance to allow for method chaining.
     */
    cross(table: string): this;

    /**
     * Add a LEFT JOIN to the query.
     * @param table The table to join.
     * @param condition The condition to join on.
     * @param values The values for the condition.
     * @returns {this} The current instance to allow for method chaining.
     */

    left(table: string, condition: string, ...values: any[]): this;

    /**
     * Add a RIGHT JOIN to the query.
     * @param table The table to join.
     * @param condition The condition to join on.
     * @param values The values for the condition.
     * @returns {this} The current instance to allow for method chaining.
     */
    right(table: string, condition: string, ...values: any[]): this;
}

export class SelectF {
    /**
     * Selects the specified column(s) for the query.
     * @param {...string} columns - The column(s) to select.
     * @returns {this} The current instance to allow for method chaining.
     */
    column(...columns: string[]): this;

    /**
     * Specifies that the query should return only distinct results.
     * @returns {this} The current instance to allow for method chaining.
     */
    distinct(): this;

    /**
     * Specifies that the query should return all results, including duplicates.
     * @returns {this} The current instance to allow for method chaining.
     */
    duplicate(): this;
}

export class SetF {
     /**
     * Adds a SET clause to the query
     * @param {string} column - The column name to set
     * @param {any} value - The value to set the column to
     * @param {boolean} [unsafe=false] - Set to true if the value should not be escaped
     * @returns {this} The current instance to allow for method chaining.
     */
    add(column: string, value: any, unsafe: boolean): this;
    /**
     * Adds a SET clause to the query with an unescaped value.
     * @param {string} column - The column name to set
     * @param {any} value - The unescaped value to set the column to
     * @returns {this} The current instance to allow for method chaining.
     */
    unsafe(column: string, value: any): this;

    /**
     * Increments the value of a specified column by a given amount.
     * @param {string} column - The column name to increment.
     * @param {number} [value=1] - The amount to increment the column by. Defaults to 1.
     * @returns {this} The current instance to allow for method chaining.
     */
    increment(column: string, value: number): this;
    /**
     * Decrements the value of a specified column by a given amount.
     * @param {string} column - The column name to decrement.
     * @param {number} [value=1] - The amount to decrement the column by. Defaults to 1.
     * @returns {this} The current instance to allow for method chaining.
     */
    decrement(column: string, value: number): this;
    /**
     * Adds multiple SET clauses to the query.
     * @param {Array<[string, any]>} data - An array of column name and value pairs to set.
     * @param {boolean} [unsafe=false] - Set to true if the values should not be escaped.
     * @returns {this} The current instance to allow for method chaining.
     */
    addList(data: [string, any][], unsafe: boolean): this;
    /**
     * Adds multiple SET clauses to the query with unescaped values.
     * @param {Array<[string, any]>} data - An array of column name and value pairs to set.
     * @returns {this} The current instance to allow for method chaining.
     */
    listUnsafe(data: [string, any][]): this;
}

export class QB {
    /**
     * Initializes a new instance of the `QB` class.
     *
     * @param {string} from - The name of the table for query operations.
     * Initializes internal structures for query building such as WHERE, HAVING, ORDER BY, JOIN, SELECT, and SET clauses.
     */
    constructor(from: string);

    /**
     * Creates a new instance of the `QB` class with the specified table name.
     * @param {string} from - The name of the table to perform queries on.
     * @returns {QB} A new instance of the query builder initialized with the specified table name.
     */
    static from(from: string): QB;

    /**
     * Retrieves the WHERE clause for the query.
     * @returns {WhereHaveF} The WHERE clause of the query.
     */
    where(): WhereHaveF;

    /**
     * Retrieves the ORDER BY clause for the query.
     * @returns {OrderByF} The ORDER BY clause of the query.
     */
    orderBy(): OrderByF;

    /**
     * Retrieves the HAVING clause for the query.
     * @returns {WhereHaveF} The HAVING clause of the query.
     */
    having(): WhereHaveF;

    /**
     * Adds a GROUP BY clause to the query.
     *
     * @param {...string} column - The names of the columns to group by.
     * @returns {this} The current instance to allow for method chaining.
     */
    groupBy(...column: string[]): this;

    /**
     * Adds a LIMIT clause to the query with an optional OFFSET.
     *
     * @param {number} limit - The maximum number of records to return.
     * @param {number} [offset=0] - The number of records to skip before starting to return records.
     * @returns {this} The current instance to allow for method chaining.
     */
    limit(limit: number, offset: number): this;

    /**
     * Adds a JOIN clause to the query.
     *
     * @returns {JoinF} The JOIN clause of the query.
     */
    join(): JoinF;
    /**
     * Retrieves the SELECT clause for the query.
     * @returns {SelectF} The SELECT clause of the query.
     */
    select(): SelectF;

    /**
     * Retrieves the SET clause for the query.
     * @returns {SetF} The SET clause of the query.
     */
    set(): SetF;

    /**
     * Constructs a SQL query to retrieve records from the database table.
     * It applies any specified JOIN, WHERE, ORDER BY, and HAVING clauses, as well as
     * GROUP BY and LIMIT clauses, if they have been set previously.
     *
     * @returns {QBFrag} A query fragment representing the SQL SELECT query.
     */
    read(): QBFrag;
    /**
     * Constructs a SQL query to count the number of records in the database table.
     * It applies any specified JOIN, WHERE, ORDER BY, and HAVING clauses, as well as
     * GROUP BY and LIMIT clauses, if they have been set previously.
     *
     * @returns {QBFrag} A query fragment representing the SQL COUNT query.
     */
    count(): QBFrag;

    /**
     * Constructs a SQL query to delete records from the database table.
     * It applies any specified JOIN and WHERE clauses, as well as
     * GROUP BY and LIMIT clauses, if they have been set previously.
     *
     * @returns {QBFrag} A query fragment representing the SQL DELETE query.
     */
    delete(): QBFrag;
    /**
     * Constructs a SQL query to insert a record into the database table.
     *
     * @param {boolean} ignore - Whether to use the IGNORE keyword, which will
     *     cause the query to ignore any errors that occur while inserting the
     *     records.
     * @returns {QBFrag} A query fragment representing the SQL INSERT query.
     */
    insert(ignore: boolean): QBFrag;

    /**
     * Constructs a SQL query to insert a record into the database table, or to
     * update the record if it already exists.
     *
     * @returns {QBFrag} A query fragment representing the SQL REPLACE query.
     */
    replace(): QBFrag;

    /**
     * Constructs a SQL query to update records in the database table.
     * It applies any specified JOIN, SET, and WHERE clauses.
     *
     * @param {boolean} ignore - Whether to use the IGNORE keyword, which will
     *     cause the query to ignore any errors that occur while updating the
     *     records.
     * @returns {QBFrag} A query fragment representing the SQL UPDATE query.
     */
    update(ignore: boolean): QBFrag;

    /**
     * Constructs a SQL query to insert multiple records into the database table.
     *
     * @param {Object[]} data - An array of records to insert, where each record is an object
     *     with key-value pairs representing column names and their corresponding values.
     * @param {boolean} ignore - Whether to use the "IGNORE" keyword, which will
     *     cause the query to ignore any duplicate records or errors that occur
     *     while inserting the records.
     * @returns {QBFrag} A query fragment representing the SQL INSERT query for multiple records.
     */
    insertAll(data: { [key: string]: any }[], ignore: boolean): QBFrag;

    /**
     * Constructs a SQL query to replace multiple records in the database table.
     *
     * @param {Object[]} data - An array of records to replace, where each record is an object
     *     with key-value pairs representing column names and their corresponding values.
     * @returns {QBFrag} A query fragment representing the SQL REPLACE query for multiple records.
     */
    replaceAll(data: { [key: string]: any }[]): QBFrag;
}