import DBForge from "#/DBForge";

test("create", () => {
    expect(DBForge.create()).toBeInstanceOf(DBForge);
})

test("Create Database", () => {
    const db = DBForge
    .create()
    .createDataBase("Table")

    expect(db).toEqual("CREATE DATABASE IF NOT EXISTS `Table`;");
})

test("Drop Database", () => {
    const db = DBForge
    .create()
    .dropDataBase("Table")

    expect(db).toEqual("DROP DATABASE IF EXISTS `Table`;");
})

test("Create Table", () => {
    const db = DBForge
    .create()
    .createTable("Table")

    expect(db).toEqual("CREATE TABLE IF NOT EXISTS `Table` (\n\t\n);");
})

test("Drop Table", () => {
    const db = DBForge
    .create()
    .dropTable("Table")

    expect(db).toEqual("DROP TABLE IF EXISTS `Table`;");
})

test("Rename Table", () => {
    const db = DBForge
    .create()
    .renameTable("Table", "Table2")

    expect(db).toEqual("ALTER TABLE `Table` RENAME TO `Table2`;");
})

test("Alter Table", () => {
    const db = DBForge
    .create()
    .alterTable("Table")

    expect(db).toEqual("ALTER TABLE `Table` \n\t;");
})

test("Add primary keys", () => {
    const db = DBForge
    .create()
    .addPrimary("yes", "no", "maybe", "okay")
    .createTable("Table")

    expect(db).toEqual("CREATE TABLE IF NOT EXISTS `Table` (\n\tPRIMARY KEY (`yes`,`no`,`maybe`,`okay`)\n);");
})

test("Drop primary keys", () => {
    const db = DBForge
    .create()
    .dropPrimary()
    .alterTable("Table")

    expect(db).toEqual("ALTER TABLE `Table` \n\tDROP PRIMARY KEY;");
})

test("Add Index keys", () => {
    const db = DBForge
    .create()
    .addIndex("yes", [{ name: "no", asc: true }, { name: "maybe", asc: true }, { name: "okay", asc: false }])
    .addIndex("okay")
    .createTable("Table")

    expect(db).toEqual("CREATE TABLE IF NOT EXISTS `Table` (\n\tINDEX `Table_yes_idx` (`no` ASC,`maybe` ASC,`okay` DESC),\n\tINDEX `Table_okay_idx` (`okay` ASC)\n);");
})

test("Drop Index keys", () => {
    const db = DBForge
    .create()
    .dropIndex("yes")
    .dropIndex("okay")
    .alterTable("Table")

    expect(db).toEqual("ALTER TABLE `Table` \n\tDROP INDEX `Table_yes_idx`,\n\tDROP INDEX `Table_okay_idx`;");
})

test("Add foreign keys", () => {
    const db = DBForge
    .create()
    .addFk("id_book", "books.id", "CASCADE", "CASCADE")
    .addFk("id_author", "authors.id")
    .createTable("Table")

    expect(db).toEqual("CREATE TABLE IF NOT EXISTS `Table` (\n\tCONSTRAINT `Table_id_book_fk` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,\n\tCONSTRAINT `Table_id_author_fk` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\n);");
})

test("Drop foreign keys", () => {
    const db = DBForge
    .create()
    .dropFk("id_book")
    .dropFk("id_author")
    .alterTable("Table")

    expect(db).toEqual("ALTER TABLE `Table` \n\tDROP FOREIGN KEY `Table_id_book_fk`,\n\tDROP FOREIGN KEY `Table_id_author_fk`;");
})

test("drop Columns", () => {
    const db = DBForge
    .create()
    .dropColumn("id_book")
    .dropColumn("id_author")
    .alterTable("Table")

    expect(db).toEqual("ALTER TABLE `Table` \n\tDROP COLUMN `id_book`,\n\tDROP COLUMN `id_author`;");
})

test("add Columns", () => {
    const db = DBForge
    .create()
    .addColumn("Hello", (col) => {
        col
        .autoIncrement()
        .bool(true)
        .first()
        .comment("ehehe")
    })
    .addColumn("World", (col) => {
        col
        .after("Hello")
        .int("MEDIUM")
        .defaultValue(15, false)
        .notNull();
    })
    .createTable("oui", "parfaite");

    expect(db).toEqual("CREATE TABLE IF NOT EXISTS `oui` (\n\t`Hello` TINYINT(1) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ehehe' FIRST,\n\t`World` MEDIUMINT NOT NULL DEFAULT 15 AFTER `Hello`\n)\n\t COMMENT 'parfaite';")
})

test("add index foreign keys", () => {
    const db = DBForge
    .create()
    .addFkIndex("id_book")
    .addFkIndex("id_author")
    .createTable("Table")

    expect(db).toEqual("CREATE TABLE IF NOT EXISTS `Table` (\n\tINDEX `Table_id_book_fk_idx` (`id_book` ASC),\n\tINDEX `Table_id_author_fk_idx` (`id_author` ASC)\n);");
})

test("drop index foreign keys", () => {
    const db = DBForge
    .create()
    .dropFkIndex("id_book")
    .dropFkIndex("id_author")
    .alterTable("Table")

    expect(db).toEqual("ALTER TABLE `Table` \n\tDROP INDEX `Table_id_book_fk_idx`,\n\tDROP INDEX `Table_id_author_fk_idx`;");
})

test("add table advanced", () => {
    const db = DBForge
    .create()
    .addColumn("id", (col) => {
        col
        .autoIncrement()
        .int("BIG")
        .first()
        .comment("ehehe")
    })
    .addColumn("bookName", (col) => {
        col
        .after("id")
        .varchar(255)
    })
    .addColumn('authorName', (col) => {
        col
        .after("bookName")
        .text()
        .notNull();
    })
    .addColumn('price', (col) => {
        col
        .after("authorName")
        .float()
        .notNull()
        .defaultValue(0.00);
    })
    .addColumn('created_at', (col) => {
        col
        .after("price")
        .timestamp()
        .notNull();
    })
    .addColumn('updated_at', (col) => {
        col
        .after("created_at")
        .datetime()
        .notNull();
    })
    .addColumn('created_by', (col) => {
        col
        .blob()
    })
    .createTable("book", "parfaite");
    
    expect(db).toEqual("CREATE TABLE IF NOT EXISTS `book` (" +
        "\n\t`id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ehehe' FIRST," +
        "\n\t`bookName` VARCHAR(255) NULL DEFAULT NULL AFTER `id`," +
        "\n\t`authorName` TEXT NOT NULL AFTER `bookName`," +
        "\n\t`price` FLOAT NOT NULL DEFAULT 0 AFTER `authorName`," +
        "\n\t`created_at` TIMESTAMP NOT NULL AFTER `price`," +
        "\n\t`updated_at` DATETIME NOT NULL AFTER `created_at`," +
        "\n\t`created_by` BLOB NULL DEFAULT NULL" +
      "\n)" +
         "\n\t COMMENT 'parfaite';")
})