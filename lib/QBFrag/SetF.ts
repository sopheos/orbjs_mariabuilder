import QBFrag from "#/QBFrag/QBFrag";

export default class SetF extends QBFrag {
    /**
     * Adds a SET clause to the query
     * @param {string} column - The column name to set
     * @param {any} value - The value to set the column to
     * @param {boolean} [unsafe=false] - Set to true if the value should not be escaped
     * @returns {this} The current instance to allow for method chaining.
     */
    add(column: string, value: any, unsafe: boolean = false): this {
        return this.addValue(column, value, unsafe);
    }

    /**
     * Adds a SET clause to the query with an unescaped value.
     * @param {string} column - The column name to set
     * @param {any} value - The unescaped value to set the column to
     * @returns {this} The current instance to allow for method chaining.
     */
    unsafe(column: string, value: any): this {
        return this.addValue(column, value, true);
    }

    /**
     * Increments the value of a specified column by a given amount.
     * @param {string} column - The column name to increment.
     * @param {number} [value=1] - The amount to increment the column by. Defaults to 1.
     * @returns {this} The current instance to allow for method chaining.
     */
    increment(column: string, value: number = 1): this {
        return this.addValue(column, `${column} + ${value}`, true);
    }

    /**
     * Decrements the value of a specified column by a given amount.
     * @param {string} column - The column name to decrement.
     * @param {number} [value=1] - The amount to decrement the column by. Defaults to 1.
     * @returns {this} The current instance to allow for method chaining.
     */
    decrement(column: string, value: number = 1): this {
        return this.addValue(column, `${column} - ${value}`, true);
    }

    /**
     * Adds multiple SET clauses to the query.
     * @param {Array<[string, any]>} data - An array of column name and value pairs to set.
     * @param {boolean} [unsafe=false] - Set to true if the values should not be escaped.
     * @returns {this} The current instance to allow for method chaining.
     */
    addList(data: [string, any][], unsafe: boolean = false): this {
        for (const element of data) {
            this.addValue(element[0], element[1], unsafe);
        }
        return this;
    }

    /**
     * Adds multiple SET clauses to the query with unescaped values.
     * @param {Array<[string, any]>} data - An array of column name and value pairs to set.
     * @returns {this} The current instance to allow for method chaining.
     */
    listUnsafe(data: [string, any][]): this {
        for (const element of data) {
            this.addValue(element[0], element[1], true);
        }
        return this;
    }

    /**
     * Adds a SET clause to the query.
     * @param {string} column - The column name to set.
     * @param {any} value - The value to set the column to.
     * @param {boolean} [unsafe=false] - Set to true if the value should not be escaped.
     * @returns {this} The current instance to allow for method chaining.
     */
    private addValue(column: string, value: any, unsafe: boolean): this {
        let newSet: string = "";

        if (!this.statment) {
            newSet += `\nSET\n\t${column} = ?`;
            this.data.push(value);
        } else {
            newSet += `,\n\t${column} = ?`;
            this.data.push(value);
        }
        if (unsafe) {
            newSet = newSet.replace("?", value);
            this.data.pop();
        }
        this.statment += newSet;
        return this;
    }
}
