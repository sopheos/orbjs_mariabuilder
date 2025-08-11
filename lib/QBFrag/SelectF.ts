import QBFrag from "#/QBFrag/QBFrag";

export default class SelectF extends QBFrag {
    private isDistinct: boolean = false;
    private columnSelected: string[] = [];

    /**
     * Construct correctly the SELECT statment for when the querry is being build.
     */
    normalize(): void {
        if (this.columnSelected.length === 0) {
            this.columnSelected.push("*");
        }
        this.statment += "SELECT" + (this.isDistinct ? " DISTINCT" : "");
        for (const element of this.columnSelected) {
            this.statment += `\n\t${element}`;
        }
    }

    /**
     * Selects the specified column(s) for the query.
     * @param {...string} columns - The column(s) to select.
     * @returns {this} The current instance to allow for method chaining.
     */
    column(...columns: string[]): this {
        this.columnSelected.push(...columns);
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
