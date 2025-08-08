import { Connection, Pool } from "mariadb/*";
import QB from "#/QB";

export default class QBFrag {
    protected statment: string = "";
    protected data: Array<any> = [];
    protected parent: QB | null = null;

    constructor(parent: QB | null = null) {
        this.parent = parent;
    }

    /**
     * Returns the parent query builder
     * @returns {QB|null} the parent query builder
     */
    getParent(): QB | null {
        return this.parent;
    }

    /**
     * Merges the given fragment into this one
     * @param {QBFrag} Fragment the fragment to merge
     * @returns {this} the merged fragment
     */
    merge(Fragment: QBFrag): void {
        this.statment += Fragment.statment;
        this.data.push(...Fragment.data);
    }

    /**
     * Returns the SQL statment of the fragment
     * @returns {string} the SQL statment
     */
    getStatment(): string {
        return this.statment;
    }

    /**
     * Returns the data to be used with the prepared statement
     * @returns {any[]} the data
     */
    getData(): any[] {
        return this.data;
    }

    /**
     * Pushes a statment to the end of the fragment
     * @param {string} statment the statment to push
     * @returns {this} the fragment itself
     */
    pushStatment(statment: string): this {
        this.statment += statment;
        return this;
    }

    /**
     * Pushes the given data to the end of the fragment
     * @param {any[]} data the data to push
     * @returns {this} the fragment itself
     */
    pushData(data: any[]): this {
        this.data.push(...data);
        return this;
    }

    /**
     * Replaces the ? in the statment with the actual values
     * @param {Pool | Connection} db the database connection to use
     * @returns {string} the statment with the ? replaced
     */
    debug(db: Pool | Connection): string {
        for (const data of this.data) {
            this.statment = this.statment.replace("?", db.escape(data));
        }
        return this.statment;
    }
}
