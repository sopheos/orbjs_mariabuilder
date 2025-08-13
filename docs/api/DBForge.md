# DBForge

Here you can find all the methods attached to the DBForge class.

## Table of Content

- [DBForge](#dbforge)
  - [Table of Content](#table-of-content)
  - [Create](#create)
    - [.create()](#create-1)
  - [Reset](#reset)
    - [.reset()](#reset-1)
  - [Database](#database)
    - [.createDataBase(name)](#createdatabasename)
    - [.dropDataBase(name)](#dropdatabasename)
  - [Table](#table)
    - [.createTable(name, comment?)](#createtablename-comment)
    - [.renameTable(from, to)](#renametablefrom-to)
    - [.alterTable(name)](#altertablename)
    - [.dropTable(name)](#droptablename)
  - [Columns](#columns)
    - [.addColumn(name, callback | null)](#addcolumnname-callback--null)
    - [dropColumn(name)](#dropcolumnname)
    - [changeColumn(name, newName?, callback | null)](#changecolumnname-newname-callback--null)
  - [Columns callback](#columns-callback)
    - [.type(type, \[constraints, ...\])](#typetype-constraints-)
    - [.bool(defaultVal?)](#booldefaultval)
    - [.int(prefix?)](#intprefix)
    - [.float()](#float)
    - [.decimal(precision?, scale?)](#decimalprecision-scale)
    - [.char(len)](#charlen)
    - [.varchar(len?)](#varcharlen)
    - [.text(prefix?)](#textprefix)
    - [.enum(\[value1, ...\])](#enumvalue1-)
    - [.blob(prefix?)](#blobprefix)
    - [.timestamp()](#timestamp)
    - [.datetime()](#datetime)
    - [.date()](#date)
    - [.time()](#time)
    - [.unsigned(value?)](#unsignedvalue)
    - [.notNull()](#notnull)
    - [.defaultValue(value, quote?)](#defaultvaluevalue-quote)
    - [.autoIncrement()](#autoincrement)
    - [.comment(comment)](#commentcomment)
    - [.first()](#first)
    - [.after(column)](#aftercolumn)
  - [Keys](#keys)
    - [Primary keys](#primary-keys)
      - [.addPrimary(\[names, ...\])](#addprimarynames-)
      - [.dropPrimary()](#dropprimary)
    - [Index keys](#index-keys)
      - [.addIndex(name, \[{name, asc?}\]?)](#addindexname-name-asc)
      - [.dropIndex(name)](#dropindexname)
    - [Unique keys](#unique-keys)
      - [.addUnique(name, \[{name, asc?}\]?)](#adduniquename-name-asc)
      - [.dropUnique(name)](#dropuniquename)
    - [Foreign keys](#foreign-keys)
      - [.addFk(field, target, del?, update?)](#addfkfield-target-del-update)
      - [.dropFk(field)](#dropfkfield)
      - [.addFkIndex(field)](#addfkindexfield)
      - [.dropFkIndex(field)](#dropfkindexfield)

## Create

### .create()

Create a new DBForge object.

```ts
const db = DBForge.create();
```

## Reset

### .reset()

Reset the DBForge object. After each request, the DBForge object is also automatically reset.

```ts
DBForge
.create()
.reset();
```

## Database

### .createDataBase(name)

Create a new database with the name given.  

It does not use other builder methods.

```ts
DBForge
.create()
.createDataBase("my_database");
```

### .dropDataBase(name)

Drop a database with the name given.  

It does not use other builder methods.

```ts
DBForge
.create()
.dropDataBase("my_database");
```

## Table

### .createTable(name, comment?)

Create a new table with the name given. It can optionally have a comment.

It uses the other builder methods.

```ts
DBForge
.create()
.addColumn("id", (col) => col.int())
.createTable("my_table", "My comment");
```

### .renameTable(from, to)

Rename a table with the name given.

It does not use other builder methods.

```ts
DBForge
.create()
.renameTable("my_table", "my_new_table");
```

### .alterTable(name)

Alter a table with the name given.

It uses the other builder methods.

```ts
DBForge
.create()
.addColumn("id", (col) => col.int())
.alterTable("my_table");
```

### .dropTable(name)

Drop a table with the name given.

It does not use other builder methods.

```ts
DBForge
.create()
.dropTable("my_table");
```

## Columns

### .addColumn(name, callback | null)

Add a new column with the name given. It can also take a callback to configure the column. More information about the column builder can be found in the [callback section](#columns-callback).

```ts
DBForge
.create()
.addColumn("id", (col) => col.int())
```

### dropColumn(name)

Drop a column with the name given.

```ts
DBForge
.create()
.dropColumn("id");
```

### changeColumn(name, newName?, callback | null)

Change a column with the new name given. If no name is given, it will be the same as the old name. It can also take a callback to configure the column. More information about the column builder can be found in the [callback section](#columns-callback).

```ts
DBForge
.create()
.changeColumn("id", "new_id", (col) => col.int())
```

## Columns callback

The callback is used to configure the column. Here you can find all the methods attached to the column to configure it.

### .type(type, \[constraints, ...\])

Set the type manually of the column. The constraints can be a list of constraints. If possible avoid using this method and prefer the other methods with predefined constraints.

```ts
DBForge
.create()
.addColumn("id", (col) => col.type("VARCHAR", 255))
```

### .bool(defaultVal?)

Set the type to boolean. If no default value is given, it will be `false`. It will also make the column unsigned.

```ts
DBForge
.create()
.addColumn("id", (col) => col.bool(true))
```

### .int(prefix?)

Set the prefix to the type. The prefix can be one of the following: `TINY`, `SMALL`, `MEDIUM`, `BIG`. If no prefix is given, it will be `INT` by default.

```ts
DBForge
.create()
.addColumn("id", (col) => col.int("BIG"))
```

### .float()

Set the type to float.

```ts
DBForge
.create()
.addColumn("id", (col) => col.float())
```

### .decimal(precision?, scale?)

Set the type to decimal. If no precision is given, it will be `10`. If no scale is given, it will be `2`.

```ts
DBForge
.create()
.addColumn("id", (col) => col.decimal(10, 2))
```

### .char(len)

Set the type to char with the length given.

```ts
DBForge
.create()
.addColumn("id", (col) => col.char(255))
```

### .varchar(len?)

Set the type to varchar with the length given. by default, it will be `255`.

```ts
DBForge
.create()
.addColumn("id", (col) => col.varchar(512))
```

### .text(prefix?)

Set the type to text. The prefix can be one of the following: `TINY`, `MEDIUM`, `LONG`. If no prefix is given, it will be `TEXT` by default.

```ts
DBForge
.create()
.addColumn("id", (col) => col.text("LONG"))
```

### .enum(\[value1, ...\])

Set the type to enum with the values given. Automatically add the single quotes.

```ts
DBForge
.create()
.addColumn("id", (col) => col.enum(["value1", "value2"]))
```

### .blob(prefix?)

Set the type to blob. The prefix can be one of the following: `TINY`, `MEDIUM`, `LONG`. If no prefix is given, it will be `BLOB` by default.

```ts
DBForge
.create()
.addColumn("id", (col) => col.blob("TINY"))
```

### .timestamp()

Set the type to timestamp.

```ts
DBForge
.create()
.addColumn("id", (col) => col.timestamp())
```

### .datetime()

Set the type to datetime.

```ts
DBForge
.create()
.addColumn("id", (col) => col.datetime())
```

### .date()

Set the type to date.

```ts
DBForge
.create()
.addColumn("id", (col) => col.date())
```

### .time()

Set the type to time.

```ts
DBForge
.create()
.addColumn("id", (col) => col.time())
```

### .unsigned(value?)

Make the column unsigned. By default, it will be `false`. If no value is given to the method, it will be `true`.

```ts
DBForge
.create()
.addColumn("id", (col) => col.unsigned())
```

### .notNull()

Make the column not nullable. By default, it will be `false`.

```ts
DBForge
.create()
.addColumn("id", (col) => col.notNull())
```

### .defaultValue(value, quote?)

Set the default value of the column. by default no default value is set. If quote is set to `true`, strings will be quoted.  
Make the column not nullable.

```ts
DBForge
.create()
.addColumn("id", (col) => col.defaultValue("test", true))
```

### .autoIncrement()

Make the column auto increment. By default, it will be `false`. Make the column not nullable.

```ts
DBForge
.create()
.addColumn("id", (col) => col.autoIncrement())
```

### .comment(comment)

Set the comment of the column.

```ts
DBForge
.create()
.addColumn("id", (col) => col.comment("test comment"))
```

### .first()

Set the column to be the first column.

```ts
DBForge
.create()
.addColumn("id", (col) => col.first())
```

### .after(column)

Set the column to be after the column given.

```ts
DBForge
.create()
.addColumn("id", (col) => col.after("created_at"))
.addColumn("created_at", (col) => col.first())
```

## Keys

In this section you can find all the methods to add different sort of keys to the table.

### Primary keys

#### .addPrimary(\[names, ...\])

Add a primary key with the names given.

```ts
DBForge
.create()
.addPrimary("id", "created_at");
```

#### .dropPrimary()

Drop the primary key of the table.

```ts
DBForge
.create()
.dropPrimary();
```

### Index keys

#### .addIndex(name, [{name, asc?}]?)

Add an index with the name given. The name can be a string or an array of strings. The asc can be a boolean or an array of booleans. If no asc is given, it will be `true` by default.

```ts
DBForge
.create()
.addIndex("my_index",
    [
        { name: "id", asc: true },
        { name: "created_at", asc: false },
    ]
);
```

#### .dropIndex(name)

Drop the index with the name given.

```ts
DBForge
.create()
.dropIndex("my_index");
```

### Unique keys

#### .addUnique(name, [{name, asc?}]?)

Add a unique key with the name given. The name can be a string or an array of strings. The asc can be a boolean or an array of booleans. If no asc is given, it will be `true` by default.

```ts
DBForge
.create()
.addUnique("my_unique",
    [
        { name: "id", asc: true },
        { name: "created_at", asc: false },
    ]
);
```

#### .dropUnique(name)

Drop the unique key with the name given.

```ts
DBForge
.create()
.dropUnique("my_unique");
```

### Foreign keys

#### .addFk(field, target, del?, update?)

Add a foreing key with the field given. The del and update can be a string or an array of strings. If no del or update is given, it will be `CASCADE` by default. If the target is invalid, an error will be thrown.

```ts
DBForge
.create()
.addFk("user_id", "users.id", "CASCADE", "CASCADE");
```

#### .dropFk(field)

Drop the foreing key with the field given.

```ts
DBForge
.create()
.dropFk("user_id");
```

#### .addFkIndex(field)

Add an index to the foreing key with the field given.

```ts
DBForge
.create()
.addFkIndex("user_id");
```

#### .dropFkIndex(field)

Drop the index to the foreing key with the field given.

```ts
DBForge
.create()
.dropFkIndex("user_id");
```
