import QBFrag from "#/QBFrag/QBFrag";

export default class SelectF extends QBFrag {
    private isDistinct: boolean = false;
    private tableSelected: string[] = [];

    /**
     * Construct correctly the SELECT statment for when the querry is being build.
     */
    normalize(): void {
        if (this.tableSelected.length === 0) {
            this.tableSelected.push("*");
        }
        this.statment += "SELECT" + (this.isDistinct ? " DISTINCT" : "");
        for (const element of this.tableSelected) {
            this.statment += `\n\t${element}`;
        }
    }

    /**
     * Selects the specified table(s) for the query.
     * @param {...string} tables - The table(s) to select.
     * @returns {this} The current instance to allow for method chaining.
     */
    table(...tables: string[]): this {
        this.tableSelected.push(...tables);
        return this;
    }

    /**
     * Specifies that the query should return only distinct results.
     * @returns {this} The current instance to allow for method chaining.
     */
    distinct(): this {
        this.isDistinct = true;
        return this;
    }

    /**
     * Specifies that the query should return all results, including duplicates.
     * @returns {this} The current instance to allow for method chaining.
     */
    duplicate(): this {
        this.isDistinct = false;
        return this;
    }
}
