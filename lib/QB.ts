import WhereHaveF from "#/QBFrag/WhereHaveF";
import QBFrag from "#/QBFrag/QBFrag";
import OrderByF from "#/QBFrag/OrderByF";
import JoinF from "#/QBFrag/JoinF";
import SelectF from "#/QBFrag/SelectF";
import SetF from "#/QBFrag/SetF";

export default class QB {
    private from: string = "";
    private limitStmt: string = "";
    private groupByStmt: string = "";

    private whereF: WhereHaveF;
    private havingF: WhereHaveF;
    private orderByF: OrderByF;
    private JoinF: JoinF;
    private SelectF: SelectF;
    private SetF: SetF;

    /**
     * Initializes a new instance of the `QB` class.
     *
     * @param {string} from - The name of the table for query operations.
     * Initializes internal structures for query building such as WHERE, HAVING, ORDER BY, JOIN, SELECT, and SET clauses.
     */
    constructor(from: string) {
        this.from = from;
        this.whereF = new WhereHaveF(this, "WHERE");
        this.havingF = new WhereHaveF(this, "HAVING");
        this.orderByF = new OrderByF(this);
        this.JoinF = new JoinF(this);
        this.SelectF = new SelectF(this);
        this.SetF = new SetF(this);
    }

    /**
     * Creates a new instance of the `QB` class with the specified table name.
     * @param {string} from - The name of the table to perform queries on.
     * @returns {QB} A new instance of the query builder initialized with the specified table name.
     */
    static from(from: string): QB {
        const QB = new this(from);
        return QB;
    }

    /**
     * Retrieves the WHERE clause for the query.
     * @returns {WhereHaveF} The WHERE clause of the query.
     */
    where(): WhereHaveF {
        return this.whereF;
    }

    /**
     * Retrieves the ORDER BY clause for the query.
     * @returns {OrderByF} The ORDER BY clause of the query.
     */
    orderBy(): OrderByF {
        return this.orderByF;
    }

    /**
     * Retrieves the HAVING clause for the query.
     * @returns {WhereHaveF} The HAVING clause of the query.
     */
    having(): WhereHaveF {
        return this.havingF;
    }

    /**
     * Adds a GROUP BY clause to the query.
     *
     * @param {...string} column - The names of the columns to group by.
     * @returns {this} The current instance to allow for method chaining.
     */
    groupBy(...column: string[]): this {
        for (const element of column) {
            if (!this.groupByStmt) {
                this.groupByStmt += `\nGROUP BY\n\t${element}`;
            } else {
                this.groupByStmt += `,\n\t${element}`;
            }
        }
        return this;
    }

    /**
     * Adds a LIMIT clause to the query with an optional OFFSET.
     *
     * @param {number} limit - The maximum number of records to return.
     * @param {number} [offset=0] - The number of records to skip before starting to return records.
     * @returns {this} The current instance to allow for method chaining.
     */
    limit(limit: number, offset: number = 0): this {
        if (limit && limit > 0) {
            this.limitStmt += `\nLIMIT\n\t${limit}`;
        }
        if (offset && offset > 0) {
            this.limitStmt += `\nOFFSET\n\t${offset}`;
        }
        return this;
    }

    /**
     * Adds a JOIN clause to the query.
     *
     * @returns {JoinF} The JOIN clause of the query.
     */
    join(): JoinF {
        return this.JoinF;
    }

    /**
     * Retrieves the SELECT clause for the query.
     * @returns {SelectF} The SELECT clause of the query.
     */
    select(): SelectF {
        return this.SelectF;
    }

    /**
     * Retrieves the SET clause for the query.
     * @returns {SetF} The SET clause of the query.
     */
    set(): SetF {
        return this.SetF;
    }

    /**
     * Constructs a SQL query to retrieve records from the database table.
     * It applies any specified JOIN, WHERE, ORDER BY, and HAVING clauses, as well as
     * GROUP BY and LIMIT clauses, if they have been set previously.
     *
     * @returns {QBFrag} A query fragment representing the SQL SELECT query.
     */
    read(): QBFrag {
        const query = new QBFrag();

        this.whereF.normalize();
        this.havingF.normalize();
        this.SelectF.normalize();

        query.merge(this.SelectF);
        query.pushStatment(`\nFROM\n\t${this.from}`);
        query.merge(this.JoinF);
        query.merge(this.whereF);
        query.merge(this.orderByF);
        query.merge(this.havingF);
        query.pushStatment(this.groupByStmt + this.limitStmt + ";");

        return query;
    }

    /**
     * Constructs a SQL query to count the number of records in the database table.
     * It applies any specified JOIN, WHERE, ORDER BY, and HAVING clauses, as well as
     * GROUP BY and LIMIT clauses, if they have been set previously.
     *
     * @returns {QBFrag} A query fragment representing the SQL COUNT query.
     */
    count(): QBFrag {
        const query = new QBFrag();

        this.whereF.normalize();
        this.havingF.normalize();

        query.pushStatment(`SELECT\n\tCOUNT(*) AS sum\nFROM\n\t${this.from}`);
        query.merge(this.JoinF);
        query.merge(this.whereF);
        query.merge(this.orderByF);
        query.merge(this.havingF);
        query.pushStatment(this.groupByStmt + this.limitStmt + ";");

        return query;
    }

    /**
     * Constructs a SQL query to delete records from the database table.
     * It applies any specified JOIN and WHERE clauses, as well as
     * GROUP BY and LIMIT clauses, if they have been set previously.
     *
     * @returns {QBFrag} A query fragment representing the SQL DELETE query.
     */
    delete(): QBFrag {
        const query = new QBFrag();

        this.whereF.normalize();

        query.pushStatment(`DELETE FROM\n\t${this.from}`);
        query.merge(this.JoinF);
        query.merge(this.whereF);
        query.pushStatment(this.groupByStmt + this.limitStmt + ";");

        return query;
    }

    /**
     * Constructs a SQL query to insert a record into the database table.
     *
     * @param {boolean} ignore - Whether to use the IGNORE keyword, which will
     *     cause the query to ignore any errors that occur while inserting the
     *     records.
     * @returns {QBFrag} A query fragment representing the SQL INSERT query.
     */
    insert(ignore: boolean): QBFrag {
        const insert = "INSERT" + (ignore ? " IGNORE" : "");
        const query = new QBFrag();

        query.pushStatment(insert + ` INTO\n\t${this.from}`);
        query.merge(this.SetF);
        query.pushStatment(";");

        return query;
    }

    /**
     * Constructs a SQL query to insert a record into the database table, or to
     * update the record if it already exists.
     *
     * @returns {QBFrag} A query fragment representing the SQL REPLACE query.
     */
    replace(): QBFrag {
        const query = new QBFrag();

        query.pushStatment(`REPLACE INTO\n\t${this.from}`);
        query.merge(this.SetF);
        query.pushStatment(";");

        return query;
    }

    /**
     * Constructs a SQL query to update records in the database table.
     * It applies any specified JOIN, SET, and WHERE clauses.
     *
     * @param {boolean} ignore - Whether to use the IGNORE keyword, which will
     *     cause the query to ignore any errors that occur while updating the
     *     records.
     * @returns {QBFrag} A query fragment representing the SQL UPDATE query.
     */
    update(ignore: boolean): QBFrag {
        const insert = "UPDATE" + (ignore ? " IGNORE" : "");
        const query = new QBFrag();

        query.pushStatment(insert + ` INTO\n\t${this.from}`);
        query.merge(this.JoinF);
        query.merge(this.SetF);
        query.merge(this.whereF);
        query.pushStatment(";");

        return query;
    }

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
    insertAll(data: { [key: string]: any }[], ignore: boolean): QBFrag {
        return this.batch(data, "INSERT" + (ignore ? " IGNORE" : ""));
    }

    /**
     * Constructs a SQL query to replace multiple records in the database table.
     *
     * @param {Object[]} data - An array of records to replace, where each record is an object
     *     with key-value pairs representing column names and their corresponding values.
     * @returns {QBFrag} A query fragment representing the SQL REPLACE query for multiple records.
     */
    replaceAll(data: { [key: string]: any }[]): QBFrag {
        return this.batch(data, "REPLACE");
    }

    /**
     * Constructs a SQL query to insert multiple records into the database table.
     *
     * @param {Object[]} data - An array of records to insert, where each record is an object
     *     with key-value pairs representing column names and their corresponding values.
     * @param {string} keyword - The keyword to use for the query, which should be "INSERT" or
     *     "REPLACE".
     * @returns {QBFrag} A query fragment representing the SQL query for multiple records.
     */
    private batch(data: { [key: string]: any }[], keyword: string): QBFrag {
        const query: QBFrag = new QBFrag();
        if (!data.length) return query;

        const keys: string[] = Object.keys(data[0]);
        const valStmt: string = "(?" + ",?".repeat(keys.length - 1) + ")";

        query.pushStatment(`${keyword} INTO ${this.from} (${[keys]}) VALUES`);
        for (let i = 0; i < data.length; i++) {
            query.pushData(Object.values(data[i]));
            query.pushStatment(
                `\n\t${valStmt}` + (i < data.length - 1 ? "," : "")
            );
        }
        query.pushStatment(";");
        return query;
    }
}
