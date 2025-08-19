# Query Builder

Here you will find all the methods attached to the QB class.  
Note that you can **exit** all subclasse using the method `.getParent()`, it is not show in every method to avoid redundancy.  

## Table of Content

- [Query Builder](#query-builder)
  - [Table of Content](#table-of-content)
  - [From](#from)
    - [.from(tableName)](#fromtablename)
  - [GroupBy](#groupby)
    - [.groupBy(\[column 1, ...\])](#groupbycolumn-1-)
  - [Limit](#limit)
    - [.limit(limit, offset?)](#limitlimit-offset)
  - [OrderBy](#orderby)
    - [.orderBy()](#orderby-1)
      - [.asc(\[column 1, ...\])](#asccolumn-1-)
      - [.ascCustom(column?, \[{ condition, priority }\], defaultPriority?, \[data 1, ...\])](#asccustomcolumn--condition-priority--defaultpriority-data-1-)
      - [.desc(\[column 1, ...\])](#desccolumn-1-)
      - [.descCustom(column?, \[{ condition, priority }\], defaultPriority?, \[data 1, ...\])](#desccustomcolumn--condition-priority--defaultpriority-data-1-)
  - [Join](#join)
    - [.join()](#join-1)
      - [.cross(table)](#crosstable)
      - [.inner(table, condition, \[data 1, ...\])](#innertable-condition-data-1-)
      - [.left(table, condition, \[data 1, ...\])](#lefttable-condition-data-1-)
      - [.right(table, condition, \[data 1, ...\])](#righttable-condition-data-1-)
  - [Select](#select)
    - [.select()](#select-1)
      - [.column(\[column 1, ...\])](#columncolumn-1-)
      - [.distinct()](#distinct)
      - [.duplicate()](#duplicate)
  - [Set](#set)
    - [.add(column, value, unsafe?)](#addcolumn-value-unsafe)
    - [.addList(data, unsafe?)](#addlistdata-unsafe)
      - [.unsafe(column, value)](#unsafecolumn-value)
    - [.listUnsafe(data)](#listunsafedata)
    - [.increment(column, value?)](#incrementcolumn-value)
    - [.decrement(column, value?)](#decrementcolumn-value)
  - [Where \& Having](#where--having)
    - [And](#and)
      - [.and(condition, \[data 1, ...\])](#andcondition-data-1-)
      - [.andEq(condition, data)](#andeqcondition-data)
      - [.andNot(condition, data)](#andnotcondition-data)
      - [.andNull(condition)](#andnullcondition)
      - [.andNotNull(condition)](#andnotnullcondition)
      - [.andInf(condition, data)](#andinfcondition-data)
      - [.andInfEq(condition, data)](#andinfeqcondition-data)
      - [.andSup(condition, data)](#andsupcondition-data)
      - [.andSupEq(condition, data)](#andsupeqcondition-data)
      - [.andLike(condition, data)](#andlikecondition-data)
      - [.andNotLike(condition, data)](#andnotlikecondition-data)
      - [.andIn(\[Column, ...\], \[data 1, ...\] | QBFrag )](#andincolumn--data-1---qbfrag-)
      - [.andNotIn(\[Column, ...\], \[data 1, ...\] | QBFrag )](#andnotincolumn--data-1---qbfrag-)
    - [Or](#or)
      - [.or(condition, \[data 1, ...\])](#orcondition-data-1-)
      - [.orEq(condition, data)](#oreqcondition-data)
      - [.orNot(condition, data)](#ornotcondition-data)
      - [.orNull(condition)](#ornullcondition)
      - [.orNotNull(condition)](#ornotnullcondition)
      - [.orInf(condition, data)](#orinfcondition-data)
      - [.orInfEq(condition, data)](#orinfeqcondition-data)
      - [.orSup(condition, data)](#orsupcondition-data)
      - [.orSupEq(condition, data)](#orsupeqcondition-data)
      - [.orLike(condition, data)](#orlikecondition-data)
      - [.orNotLike(condition, data)](#ornotlikecondition-data)
      - [.orIn(\[Column, ...\], \[data 1, ...\] | QBFrag )](#orincolumn--data-1---qbfrag-)
      - [.orNotIn(\[Column, ...\], \[data 1, ...\] | QBFrag )](#ornotincolumn--data-1---qbfrag-)
  - [Request Keywords](#request-keywords)
    - [.read()](#read)
    - [.count()](#count)
    - [.insert(ignore?)](#insertignore)
    - [.update(ignore?)](#updateignore)
    - [.delete()](#delete)
    - [.replace()](#replace)
    - [.replaceAll(\[{key: value}, ...\])](#replaceallkey-value-)
    - [.insertAll(\[{key: value}, ...\], ignore?)](#insertallkey-value--ignore)

## From

### .from(tableName)

This is a static method that returns a new instance of the QB. It is the start of the request, and the option specifies the table from which you want to perform your operation.  

It is the same as if you used `new DB(tableName)`.

## GroupBy

### .groupBy(\[column 1, ...\])

groupBy take a list of columns to group them by.  

```ts
QB
.from("table")
.groupBy("column1", "column2");
```

## Limit

### .limit(limit, offset?)

This method adds a LIMIT clause to the query with an optional OFFSET.

```ts
QB
.from("table")
.limit(10, 100);
```

## OrderBy

### .orderBy()

Return the class to perform the ordering.

#### .asc(\[column 1, ...\])

Order the colums by ascending order.

```ts
QB
.from("table")
.orderBy()
.asc("id", "name");
```

#### .ascCustom(column?, \[{ condition, priority }\], defaultPriority?, \[data 1, ...\])

Add a custom ORDER BY clause using CASE statements to the query.

```ts
QB.from("table")
.orderBy()
.ascCustom(
    "name",
    [
        { condition: "John", priority: 0 },
        { condition: "Jane", priority: 1 },
    ],
    2,);

QB.from("table")
.orderBy()
.ascCustom(
    undefined,
    [
        { condition: "id = ?", priority: 0 },
        { condition: "id < ?", priority: 1 },
    ],
    2,
    [0, 1000]);
```

#### .desc(\[column 1, ...\])

Order the columns by descending order.

```ts
QB
.from("table")
.orderBy()
.desc("id", "name");
```

#### .descCustom(column?, \[{ condition, priority }\], defaultPriority?, \[data 1, ...\])

Add a custom ORDER BY clause using CASE statements to the query.

```ts
QB.from("table")
.orderBy()
.descCustom(
    "name",
    [
        { condition: "John", priority: 0 },
        { condition: "Jane", priority: 1 },
    ],
    2,);

QB.from("table")
.orderBy()
.descCustom(
    undefined,
    [
        { condition: "id = ?", priority: 0 },
        { condition: "id < ?", priority: 1 },
    ],
    2,
    [0, 1000]);
```

## Join

### .join()

Return the class to perform the join.

#### .cross(table)

Add a CROSS JOIN to the query.

```ts
QB
.from("table")
.join()
.cross("table");
```

#### .inner(table, condition, \[data 1, ...\])

Add an INNER JOIN to the query.

```ts
QB
.from("table")
.join()
.inner("table", "id = ?", [1]);
```

#### .left(table, condition, \[data 1, ...\])

Add a LEFT JOIN to the query.

```ts
QB
.from("table")
.join()
.left("table", "id = ?", [1]);
```

#### .right(table, condition, \[data 1, ...\])

Add a RIGHT JOIN to the query.

```ts
QB
.from("table")
.join()
.right("table", "id = ?", [1]);
```

## Select

### .select()

Return the class to perform the selection.

#### .column(\[column 1, ...\])

Select the specified column(s) for the query. By default, all columns are selected.

```ts
QB
.from("table")
.select()
.column("id", "name");
```

#### .distinct()

Specifies that the query should return only distinct results. By default, the duplicate results are returned.

```ts
QB
.from("table")
.select()
.distinct();
```

#### .duplicate()

Specifies that the query should return duplicate results. By default, the duplicate results are returned.

```ts
QB
.from("table")
.select()
.duplicate();
```

## Set

This method adds a SET clause to the query. It is used for the `UPDATE`, `INSERT` or `REPLACE` statement.

### .add(column, value, unsafe?)

Set a column to a specific value.

```ts
QB
.from("table")
.set()
.add("name", "John");
```

### .addList(data, unsafe?)

Add multiple columns and values to the SET clause.

```ts
QB
.from("table")
.set()
.addList({name: "john", age: 30});
```

#### .unsafe(column, value)

Set a column to a specific value without escaping the value.

```ts
QB
.from("table")
.set()
.unsafe("name", "John");
```

### .listUnsafe(data)

Add multiple columns and values to the SET clause without escaping the values.

```ts
QB
.from("table")
.set()
.listUnsafe({age: "age + 1"});
```

### .increment(column, value?)

Increment the value of a specified column by a given amount. Defaults to 1.

```ts
QB
.from("table")
.set()
.increment("age");
```

### .decrement(column, value?)

Decrement the value of a specified column by a given amount. Defaults to 1.

```ts
QB
.from("table")
.set()
.decrement("age");
```

## Where & Having

The `where` and `having` methods are used to add conditions to the query. They use the same syntax but remember that the `where` clause is used for the `SELECT` statement and the `having` clause is used for the `GROUP BY` statement.

### And

#### .and(condition, \[data 1, ...\])

Add a condition to the WHERE/HAVING clause with the AND keyword.

```ts
QB
.from("table")
.where()
.and("id = ?", [1]);
```

#### .andEq(condition, data)

Adds a condition to the WHERE/HAVING clause with the AND keyword to check if the specified statement is equal to a value. If the value is null, calls `andNull` instead.

```ts
QB
.from("table")
.where()
.andEq("name", "John");

QB
.from("table")
.where()
.andEq("name", null);
```

#### .andNot(condition, data)

Adds a condition to the WHERE/HAVING clause with the AND keyword to check if the specified statement is not equal to a value. If the value is null, calls `andNotNull` instead.

```ts
QB
.from("table")
.where()
.andNot("name", "John");

QB
.from("table")
.where()
.andNot("name", null);
```

#### .andNull(condition)

Adds a condition to the WHERE/HAVING clause with the AND keyword for checking if the specified statement is NULL.

```ts
QB
.from("table")
.where()
.andNull("name");
```

#### .andNotNull(condition)

Adds a condition to the WHERE/HAVING clause with the AND keyword for checking if the specified statement is NOT NULL.

```ts
QB
.from("table")
.where()
.andNotNull("name");
```

#### .andInf(condition, data)

Adds a condition to the WHERE/HAVING clause with the AND keyword to check if the specified statement is strictly inferior to a value.

```ts
QB
.from("table")
.where()
.andInf("id", 10);
```

#### .andInfEq(condition, data)

Adds a condition to the WHERE/HAVING clause with the AND keyword to check if the specified statement is inferior or equal to a value.

```ts
QB
.from("table")
.where()
.andInfEq("id", 10);
```

#### .andSup(condition, data)

Adds a condition to the WHERE/HAVING clause with the AND keyword to check if the specified statement is strictly superior to a value.

```ts
QB
.from("table")
.where()
.andSup("id", 10);
```

#### .andSupEq(condition, data)

Adds a condition to the WHERE/HAVING clause with the AND keyword to check if the specified statement is superior or equal to a value.

```ts
QB
.from("table")
.where()
.andSupEq("id", 10);
```

#### .andLike(condition, data)

Adds a condition to the WHERE/HAVING clause with the AND keyword to check if the specified statement is LIKE a value.

```ts
QB
.from("table")
.where()
.andLike("name", "J%");
```

#### .andNotLike(condition, data)

Adds a condition to the WHERE/HAVING clause with the AND keyword to check if the specified statement is NOT LIKE a value.

```ts
QB
.from("table")
.where()
.andNotLike("name", "J%");
```

#### .andIn(\[Column, ...\], \[data 1, ...\] | QBFrag )

Adds a condition to the WHERE/HAVING clause with the AND keyword to check if the column is in the list of values. The list of value can also be provided as a query fragment from another query.

```ts
QB
.from("table")
.where()
.andIn("id", [1, 2, 3]);

QB
.from("table")
.where()
.andIn("id", QB.from("other_table").select().column("id").read());

QB
.from("table")
.where()
.andIn(
    ["id", "name"],
    [
        [1, "John"],
        [2, "Jane"],
        [3, "Bob"]
    ]
);
```

#### .andNotIn(\[Column, ...\], \[data 1, ...\] | QBFrag )

Adds a condition to the WHERE/HAVING clause with the AND keyword to check if the column is not in the list of values. The list of value can also be provided as a query fragment from another query.

```ts
QB
.from("table")
.where()
.andNotIn("id", [1, 2, 3]);

QB
.from("table")
.where()
.andNotIn("id", QB.from("other_table").select().column("id").read());

QB
.from("table")
.where()
.andNotIn(
    ["id", "name"],
    [
        [1, "John"],
        [2, "Jane"],
        [3, "Bob"]
    ]
);
```

### Or

#### .or(condition, \[data 1, ...\])

Add a condition to the WHERE/HAVING clause with the OR keyword.

```ts
QB
.from("table")
.where()
.and("id = ?", [1]);
```

#### .orEq(condition, data)

Adds a condition to the WHERE/HAVING clause with the OR keyword to check if the specified statement is equal to a value. If the value is null, calls `orNull` instead.

```ts
QB
.from("table")
.where()
.orEq("name", "John");

QB
.from("table")
.where()
.orEq("name", null);
```

#### .orNot(condition, data)

Adds a condition to the WHERE/HAVING clause with the OR keyword to check if the specified statement is not equal to a value. If the value is null, calls `orNotNull` instead.

```ts
QB
.from("table")
.where()
.orNot("name", "John");

QB
.from("table")
.where()
.orNot("name", null);
```

#### .orNull(condition)

Adds a condition to the WHERE/HAVING clause with the OR keyword for checking if the specified statement is NULL.

```ts
QB
.from("table")
.where()
.orNull("name");
```

#### .orNotNull(condition)

Adds a condition to the WHERE/HAVING clause with the OR keyword for checking if the specified statement is NOT NULL.

```ts
QB
.from("table")
.where()
.orNotNull("name");
```

#### .orInf(condition, data)

Adds a condition to the WHERE/HAVING clause with the OR keyword to check if the specified statement is strictly inferior to a value.

```ts
QB
.from("table")
.where()
.orInf("id", 10);
```

#### .orInfEq(condition, data)

Adds a condition to the WHERE/HAVING clause with the OR keyword to check if the specified statement is inferior or equal to a value.

```ts
QB
.from("table")
.where()
.orInfEq("id", 10);
```

#### .orSup(condition, data)

Adds a condition to the WHERE/HAVING clause with the OR keyword to check if the specified statement is strictly superior to a value.

```ts
QB
.from("table")
.where()
.orSup("id", 10);
```

#### .orSupEq(condition, data)

Adds a condition to the WHERE/HAVING clause with the OR keyword to check if the specified statement is superior or equal to a value.

```ts
QB
.from("table")
.where()
.orSupEq("id", 10);
```

#### .orLike(condition, data)

Adds a condition to the WHERE/HAVING clause with the OR keyword to check if the specified statement is LIKE a value.

```ts
QB
.from("table")
.where()
.orLike("name", "J%");
```

#### .orNotLike(condition, data)

Adds a condition to the WHERE/HAVING clause with the OR keyword to check if the specified statement is NOT LIKE a value.

```ts
QB
.from("table")
.where()
.orNotLike("name", "J%");
```

#### .orIn(\[Column, ...\], \[data 1, ...\] | QBFrag )

Adds a condition to the WHERE/HAVING clause with the OR keyword to check if the column is in the list of values. The list of value can also be provided as a query fragment from another query.

```ts
QB
.from("table")
.where()
.orIn("id", [1, 2, 3]);

QB
.from("table")
.where()
.orIn("id", QB.from("other_table").select().column("id").read());

QB
.from("table")
.where()
.orIn(
    ["id", "name"],
    [
        [1, "John"],
        [2, "Jane"],
        [3, "Bob"]
    ]
);
```

#### .orNotIn(\[Column, ...\], \[data 1, ...\] | QBFrag )

Adds a condition to the WHERE/HAVING clause with the OR keyword to check if the column is not in the list of values. The list of value can also be provided as a query fragment from another query.

```ts
QB
.from("table")
.where()
.orNotIn("id", [1, 2, 3]);

QB
.from("table")
.where()
.orNotIn("id", QB.from("other_table").select().column("id").read());

QB
.from("table")
.where()
.orNotIn(
    ["id", "name"],
    [
        [1, "John"],
        [2, "Jane"],
        [3, "Bob"]
    ]
);
```

## Request Keywords

All of these methods return a `QBFrag` object. This object contains the SQL request as a string and the data to be used in the request as an array.  
You can access them using the `.getStatement()` and `.getData()` methods.

### .read()

This methode return an SELECT request with the columns and the tables specified in the query builder.

It can use :

- [Select](#select)
- [Join](#join)
- [Where](#where--having)
- [OrderBy](#orderby)
- [Having](#where--having)
- [GroupBy](#groupby)
- [Limit](#limit)

```ts
QB
.from("table")
.where()
.andEq("id", 1)
.read();
```

### .count()

This methode return an COUNT request with the tables specified in the query builder.

It can use :

- [Join](#join)
- [Where](#where--having)
- [OrderBy](#orderby)
- [Having](#where--having)
- [GroupBy](#groupby)
- [Limit](#limit)

```ts
QB
.from("table")
.where()
.andEq("id", 1)
.count();
```

### .insert(ignore?)

This methode return an INSERT request with the columns and the tables specified in the query builder.
It insert a single record. By default, it does not use the IGNORE keyword, but it can be used with the `ignore` parameter.  

It can use :

- [Set](#set)

```ts
QB
.from("table")
.set("name", "John")
.set("age", 30)
.insert();
```

### .update(ignore?)

This methode return an UPDATE request with the columns and the tables specified in the query builder.
It update a single record. By default, it does not use the IGNORE keyword, but it can be used with the `ignore` parameter.  

It can use :

- [Join](#join)
- [Set](#set)
- [Where](#where--having)

```ts
QB
.from("table")
.set("name", "John")
.set("age", 30)
.where()
.andEq("id", 1)
.update();
```

### .delete()

This methode return an DELETE request with the tables specified in the query builder.

It can use :

- [Join](#join)
- [Where](#where--having)
- [GroupBy](#groupby)
- [Limit](#limit)

```ts
QB
.from("table")
.where()
.andEq("id", 1)
.delete();
```

### .replace()

This methode return an REPLACE request with the columns and the tables specified in the query builder.
It replace a single record.

It can use :

- [Set](#set)

```ts
QB
.from("table")
.set("name", "John")
.set("age", 30)
.replace();
```

### .replaceAll([{key: value}, ...])

This methode return an REPLACE request with the columns and the tables specified in the query builder.
It replace all records.

It does not use other builder methods.

```ts
QB
.from("table")
.replaceAll([
    {name: "John", age: 30},
    {name: "Jane", age: 25},
    {name: "Bob", age: 40}
]);
```

### .insertAll([{key: value}, ...], ignore?)

This methode return an INSERT request with the columns and the tables specified in the query builder.
It insert all records. By default, it does not use the IGNORE keyword, but it can be used with the `ignore` parameter.

It does not use other builder methods.

```ts
QB
.from("table")
.insertAll([
    {name: "John", age: 30},
    {name: "Jane", age: 25},
    {name: "Bob", age: 40}
], true);
```
