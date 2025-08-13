import QBFrag from "./QBFrag";

export default class OrderByF extends QBFrag {
    /**
     * Sets the columns to order by in ascending order
     * @param {...string} column the column(s) to order by
     * @returns {this} The current instance to allow for method chaining.
     */
    asc(...column: string[]): this {
        return this.add("ASC", ...column);
    }

    /**
     * Sets the columns to order by in descending order
     * @param {...string} column the column(s) to order by
     * @returns {this} The current instance to allow for method chaining.
     */
    desc(...column: string[]): this {
        return this.add("DESC", ...column);
    }

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
        column: string = "",
        when: { condition: string; priority: string | number }[],
        defaultPriority: string | number | null = null,
        ...data: any[]
    ): this {
        return this.addCustom("ASC", column, when, defaultPriority, ...data);
    }

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
        column: string = "",
        when: { condition: string; priority: string | number }[],
        defaultPriority: string | number | null = null,
        ...data: any[]
    ): this {
        return this.addCustom("DESC", column, when, defaultPriority, ...data);
    }

    /**
     * Appends the columns to the ORDER BY clause with the specified order.
     * If it is the first column being added, it initializes the ORDER BY statement.
     * Subsequent columns are added with a comma separator.
     *
     * @param {("ASC" | "DESC")} order - The order direction for the columns.
     * @param {...string[]} column - The column(s) to be ordered.
     * @returns {this} The current instance to allow for method chaining.
     */
    private add(order: "ASC" | "DESC", ...column: string[]): this {
        for (const element of column) {
            if (!this.statment) {
                this.statment += `\nORDER BY\n\t${element} ${order}`;
            } else {
                this.statment += `,\n\t${element} ${order}`;
            }
        }
        return this;
    }

    /**
     * Appends a custom ORDER BY clause using CASE statements to the SQL query.
     * Allows for specifying multiple conditions with their respective priorities
     * and an optional default priority when conditions are not met.
     *
     * @param {"ASC" | "DESC"} order - The order direction for the columns.
     * @param {string} [column=""] - The column to apply the CASE statement to.
     * @param {{ condition: string; priority: string | number }[]} when - An array of conditions with their priority values.
     * @param {string | number | null} [defaultPriority=null] - The default priority if no conditions are met.
     * @param {...any[]} data - Additional data for the prepared statement.
     * @returns {this} The current instance to allow for method chaining.
     */
    private addCustom(
        order: "ASC" | "DESC",
        column: string,
        when: { condition: string; priority: string | number }[],
        defaultPriority: string | number | null,
        ...data: any[]
    ): this {
        if (this.statment === "") {
            this.statment += "\nORDER BY";
        } else {
            this.statment += ",";
        }
        if (column) {
            column = " " + column;
        }
        this.statment += `\n\tCASE${column}`;
        for (const element of when) {
            this.statment += `\n\t\tWHEN ${element.condition} THEN ${element.priority}`;
        }
        if (defaultPriority !== null) {
            this.statment += `\n\t\tELSE ${defaultPriority}`;
        }
        this.statment += `\n\tEND ${order}`;
        this.data.push(...data);
        return this;
    }
}
