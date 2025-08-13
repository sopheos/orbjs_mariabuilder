import QBFrag from "./QBFrag";

export default class JoinF extends QBFrag {
    /**
     * Add an INNER JOIN to the query.
     * @param table The table to join.
     * @param condition The condition to join on.
     * @param values The values for the condition.
     * @returns {this} The current instance to allow for method chaining.
     */
    inner(table: string, condition: string, ...values: any[]): this {
        return this.join(table, condition, "INNER", ...values);
    }

    /**
     * Add a CROSS JOIN to the query.
     * @param table The table to join.
     * @returns {this} The current instance to allow for method chaining.
     */
    cross(table: string): this {
        return this.join(table, null, "CROSS");
    }

    /**
     * Add a LEFT JOIN to the query.
     * @param table The table to join.
     * @param condition The condition to join on.
     * @param values The values for the condition.
     * @returns {this} The current instance to allow for method chaining.
     */

    left(table: string, condition: string, ...values: any[]): this {
        return this.join(table, condition, "LEFT", ...values);
    }

    /**
     * Add a RIGHT JOIN to the query.
     * @param table The table to join.
     * @param condition The condition to join on.
     * @param values The values for the condition.
     * @returns {this} The current instance to allow for method chaining.
     */
    right(table: string, condition: string, ...values: any[]): this {
        return this.join(table, condition, "RIGHT", ...values);
    }

    /**
     * Internal function to add a JOIN to the query.

     * @param table The table to join.
     * @param condition The condition to join on.
     * @param type The type of JOIN (INNER, LEFT, RIGHT, CROSS).
     * @param values The values for the condition.
     * @returns {this} The current instance to allow for method chaining.
     */
    private join(
        table: string,
        condition: string | null,
        type: string,
        ...values: any[]
    ): this {
        this.statment +=
            "\n\t" +
            `${type} JOIN ${table}` +
            (condition !== null ? ` ON ${condition}` : "");
        this.data.push(...values);
        return this;
    }
}
