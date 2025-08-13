import QB from "../QB";
import QBFrag from "./QBFrag";

export default class WhereHaveF extends QBFrag {
    private groupCount: number = 0;
    private groupLevel: number = 0;
    private keyWord: string;

    /**
     * Initializes a new instance of the `WhereHaveF` class.
     *
     * @param {QB | null} [parent=null] - The parent query builder.
     * @param {string} keyWord - The keyword to use.
     * Used to create and instance of WHERE and HAVE with the same class.
     */
    constructor(parent: QB | null, keyWord: string) {
        super(parent);
        this.keyWord = keyWord;
    }

    /**
     * Close all the currently open groups. It is used when the querry is being build.
     */
    normalize(): void {
        while (this.groupLevel > 0) {
            this.groupDecrease();
        }
    }

    /**
     * Add a condition to the WHERE/HAVING clause with the AND keyword.
     *
     * @param {string} statment - The condition to be added.
     * @param {...any[]} data - The values to be used in the condition.
     * @returns {this} The current instance to allow for method chaining.
     */
    and(statment: string, ...data: any[]): this {
        return this.add("AND", statment, ...data);
    }

    /**
     * Add a condition to the WHERE/HAVING clause with the OR keyword.
     *
     * @param {string} statment - The condition to be added.
     * @param {...any[]} data - The values to be used in the condition.
     * @returns {this} The current instance to allow for method chaining.
     */
    or(statment: string, ...data: any[]): this {
        return this.add("OR", statment, ...data);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword
     * for checking if the specified statement is NULL.
     *
     * @param {string} statment - The condition to be checked for NULL.
     * @returns {this} The current instance to allow for method chaining.
     */
    andNull(statment: string): this {
        return this.add("AND", statment + " IS NULL");
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword
     * for checking if the specified statement is NULL.
     *
     * @param {string} statment - The condition to be checked for NULL.
     * @returns {this} The current instance to allow for method chaining.
     */
    orNull(statment: string): this {
        return this.add("OR", statment + " IS NULL");
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword
     * for checking if the specified statement is NOT NULL.
     *
     * @param {string} statment - The condition to be checked for NOT NULL.
     * @returns {this} The current instance to allow for method chaining.
     */
    andNotNull(statment: string): this {
        return this.add("AND", statment + " IS NOT NULL");
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword
     * for checking if the specified statement is NOT NULL.
     *
     * @param {string} statment - The condition to be checked for NOT NULL.
     * @returns {this} The current instance to allow for method chaining.
     */
    orNotNull(statment: string): this {
        return this.add("OR", statment + " IS NOT NULL");
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified statement is equal to a value. If no value is provided,
     * it checks if the statement is NULL.
     *
     * @param {string} statment - The condition to be checked for equality or NULL.
     * @param {any} data - The values to be compared for equality.
     * @returns {this} The current instance to allow for method chaining.
     */
    andEq(statment: string, data: any): this {
        if (data === null) {
            return this.andNull(statment);
        }
        return this.add("AND", statment + " = ?", data);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified statement is equal to a value. If no value is provided,
     * it checks if the statement is NULL.
     *
     * @param {string} statment - The condition to be checked for equality or NULL.
     * @param {any} data - The values to be compared for equality.
     * @returns {this} The current instance to allow for method chaining.
     */
    orEq(statment: string, data: any): this {
        if (data === null) {
            return this.orNull(statment);
        }
        return this.add("OR", statment + " = ?", data);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified statement is not equal to a value. If no value is provided,
     * it checks if the statement is NOT NULL.
     *
     * @param {string} statment - The condition to be checked for inequality or NOT NULL.
     * @param {any} data - The values to be compared for inequality.
     * @returns {this} The current instance to allow for method chaining.
     */
    andNot(statment: string, data: any): this {
        if (data === null) {
            return this.andNotNull(statment);
        }
        return this.add("AND", statment + " <> ?", data);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified statement is not equal to a value. If no value is provided,
     * it checks if the statement is NOT NULL.
     *
     * @param {string} statment - The condition to be checked for inequality or NOT NULL.
     * @param {any} data - The values to be compared for inequality.
     * @returns {this} The current instance to allow for method chaining.
     */
    orNot(statment: string, data: any): this {
        if (data === null) {
            return this.orNotNull(statment);
        }
        return this.add("OR", statment + " <> ?", data);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified statement is strictly superior to a value.
     *
     * @param {string} statment - The condition to be checked for superiority.
     * @param {any} data - The values to be compared for superiority.
     * @returns {this} The current instance to allow for method chaining.
     */
    andSup(statment: string, data: any): this {
        return this.add("AND", statment + " > ?", data);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified statement is strictly superior to a value.
     *
     * @param {string} statment - The condition to be checked for superiority.
     * @param {any} data - The values to be compared for superiority.
     * @returns {this} The current instance to allow for method chaining.
     */
    orSup(statment: string, data: any): this {
        return this.add("OR", statment + " > ?", data);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified statement is strictly inferior to a value.
     *
     * @param {string} statment - The condition to be checked for inferiority.
     * @param {any} data - The values to be compared for inferiority.
     * @returns {this} The current instance to allow for method chaining.
     */
    andInf(statment: string, data: any): this {
        return this.add("AND", statment + " < ?", data);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified statement is strictly inferior to a value.
     *
     * @param {string} statment - The condition to be checked for inferiority.
     * @param {any} data - The values to be compared for inferiority.
     * @returns {this} The current instance to allow for method chaining.
     */
    orInf(statment: string, data: any): this {
        return this.add("OR", statment + " < ?", data);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified statement is superior or equal to a value.
     *
     * @param {string} statment - The condition to be checked for superiority or equality.
     * @param {any} data - The values to be compared for superiority or equality.
     * @returns {this} The current instance to allow for method chaining.
     */
    andSupEq(statment: string, data: any): this {
        return this.add("AND", statment + " >= ?", data);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified statement is superior or equal to a value.
     *
     * @param {string} statment - The condition to be checked for superiority or equality.
     * @param {any} data - The values to be compared for superiority or equality.
     * @returns {this} The current instance to allow for method chaining.
     */
    orSupEq(statment: string, data: any): this {
        return this.add("OR", statment + " >= ?", data);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified statement is inferior or equal to a value.
     *
     * @param {string} statment - The condition to be checked for inferiority or equality.
     * @param {any} data - The values to be compared for inferiority or equality.
     * @returns {this} The current instance to allow for method chaining.
     */
    andInfEq(statment: string, data: any): this {
        return this.add("AND", statment + " <= ?", data);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified statement is inferior or equal to a value.
     *
     * @param {string} statment - The condition to be checked for inferiority or equality.
     * @param {any} data - The values to be compared for inferiority or equality.
     * @returns {this} The current instance to allow for method chaining.
     */
    orInfEq(statment: string, data: any): this {
        return this.add("OR", statment + " <= ?", data);
    }

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
    andIn(column: string | string[], values: any[] | any[][] | QBFrag): this {
        return this.addIn("AND", "IN", column, values);
    }

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
    orIn(column: string | string[], values: any[] | any[][] | QBFrag): this {
        return this.addIn("OR", "IN", column, values);
    }

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
    ): this {
        return this.addIn("AND", "NOT IN", column, values);
    }

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
    orNotIn(column: string | string[], values: any[] | any[][] | QBFrag): this {
        return this.addIn("OR", "NOT IN", column, values);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified column is like the specified value.
     *
     * @param {string} column - The column name to check.
     * @param {string} value - The value to check against.
     * @returns {this} The current instance to allow for method chaining.
     */
    andLike(column: string, value: string): this {
        return this.and(column + " LIKE ?", value);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified column is like the specified value.
     *
     * @param {string} column - The column name to check.
     * @param {string} value - The value to check against.
     * @returns {this} The current instance to allow for method chaining.
     */
    orLike(column: string, value: string): this {
        return this.or(column + " LIKE ?", value);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the AND keyword to check
     * if the specified column is not like the specified value.
     *
     * @param {string} column - The column name to check.
     * @param {string} value - The value to check against.
     * @returns {this} The current instance to allow for method chaining.
     */
    andNotLike(column: string, value: string): this {
        return this.and(column + " NOT LIKE ?", value);
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the OR keyword to check
     * if the specified column is not like the specified value.
     *
     * @param {string} column - The column name to check.
     * @param {string} value - The value to check against.
     * @returns {this} The current instance to allow for method chaining.
     */
    orNotLike(column: string, value: string): this {
        return this.or(column + " NOT LIKE ?", value);
    }

    /**
     * Starts a new group of conditions with the AND keyword.
     * It should be finalized with a call to `groupEnd`.
     *
     * @returns {this} The current instance to allow for method chaining.
     */
    andGroupStart(): this {
        return this.group("AND");
    }

    /**
     * Starts a new group of conditions with the OR keyword.
     * It should be finalized with a call to `groupEnd`.
     *
     * @returns {this} The current instance to allow for method chaining.
     */
    orGroupStart(): this {
        return this.group("OR");
    }

    /**
     * Ends the current group of conditions. This method should be called
     * after starting a group with `andGroupStart` or `orGroupStart`.
     *
     * @returns {this} The current instance to allow for method chaining.
     */
    groupEnd(): this {
        return this.groupDecrease();
    }

    /**
     * Adds a condition to the current SQL statement with the specified prefix.
     * This method appends the given statement and data to the existing statement,
     * maintaining the appropriate indentation level and prefix based on the current
     * grouping context.
     *
     * @param {string} prefix - The prefix to add before the statement, such as "AND" or "OR".
     * @param {string} statment - The SQL condition or expression to be added.
     * @param {...any[]} data - The values to be used with the prepared statement.
     * @returns {this} The current instance to allow for method chaining.
     */
    private add(prefix: string, statment: string, ...data: any[]): this {
        if (this.statment.length && this.groupCount !== 0) {
            this.statment +=
                "\n" + "\t".repeat(this.groupLevel + 1) + prefix + " ";
        } else if (!this.statment.length && this.groupCount === 0) {
            this.statment =
                `\n${this.keyWord}\n` + "\t".repeat(this.groupLevel + 1);
        } else {
            this.statment += "\n" + "\t".repeat(this.groupLevel + 1);
        }
        this.statment += statment;
        this.groupCount++;
        this.data.push(...data);

        return this;
    }

    /**
     * Adds a condition to the WHERE/HAVING clause with the specified prefix and operator
     * to check if the specified column(s) is in a list of values. Supports both single
     * and multiple column checks using the IN or NOT IN operators.
     *
     * @param {string} prefix - The prefix to add before the statement, such as "AND" or "OR".
     * @param {string} operator - The operator for the condition, typically "IN" or "NOT IN".
     * @param {string | string[]} column - The column name or array of column names to check.
     * @param {any[] | any[][] | QBFrag} values - An array of values, an array of arrays of values,
     *     or a query fragment representing the list of values to check.
     * @returns {this} The current instance to allow for method chaining.
     */
    private addIn(
        prefix: string,
        operator: string,
        column: string | string[],
        values: any[] | any[][] | QBFrag
    ): this {
        let statment: string = "";
        let nbCol: number = 1;
        let nbVal: number = 0;
        let data: string[] = [];

        if (column instanceof Array) {
            nbCol = column.length;
            column = `(${column.join(", ")})`;
        }

        if (values instanceof QBFrag) {
            statment = values.getStatement();
            data = values.getData();
            return this.add(
                prefix,
                `${column} ${operator} (\n\t\t${statment.replaceAll("\n", "\n" + "\t".repeat(this.groupLevel + 2))}\n\t)`,
                ...data
            );
        }

        data = values.flat();
        nbVal = values.length;

        if (nbCol === 1) {
            statment = "?" + ", ?".repeat(nbVal - 1);
            return this.add(
                prefix,
                `${column} ${operator} (${statment})`,
                ...data
            );
        }

        let subStatment = "?" + ", ?".repeat(nbCol - 1);

        statment = "\n" + "\t".repeat(this.groupLevel + 2) + "(";
        for (let i: number = 0; i < nbVal; i++) {
            if (i !== 0) {
                statment += ",\n" + "\t".repeat(this.groupLevel + 2) + "(";
            }
            statment += subStatment + ")";
        }
        statment += "\n" + "\t".repeat(this.groupLevel + 1);

        return this.add(prefix, `${column} ${operator} (${statment})`, ...data);
    }

    /**
     * Starts a new group of conditions with the specified prefix.
     *
     * @param {string} prefix - The prefix to add before the statement, such as "AND" or "OR".
     * @returns {this} The current instance to allow for method chaining.
     */
    private group(prefix: string): this {
        this.statment += "\n" + "\t".repeat(this.groupLevel + 1);
        if (this.groupCount !== 0) {
            this.statment += prefix + " ";
        }
        this.statment += "(";
        this.groupLevel++;
        this.groupCount = 0;
        return this;
    }

    /**
     * Decreases the group level by one, closing the current group and appending the required number of tabs.
     *
     * @returns {this} The current instance to allow for method chaining.
     */
    private groupDecrease(): this {
        if (this.groupLevel <= 0) return this;
        this.statment += "\n" + "\t".repeat(this.groupLevel) + ")";
        this.groupLevel--;
        return this;
    }
}
