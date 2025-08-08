import QB from "#/QB";

test("Count", () => {
    const res = QB
    .from("test")
    .count()

    expect(res.getStatment()).toEqual("SELECT\n\tCOUNT(*) AS sum\nFROM\n\ttest;");
    expect(res.getData()).toEqual([]);
})

test("Delete", () => {
    const res = QB
    .from("test")
    .where()
    .andEq("id", 1)
    .getParent()
    .delete()

    expect(res.getStatment()).toEqual("DELETE FROM\n\ttest\nWHERE\n\tid = ?;");
    expect(res.getData()).toEqual([1]);
})

test("Update", () => {
    const res = QB
    .from("test")
    .where()
    .andEq("id", 1)
    .getParent()
    .set()
    .add("id", 1)
    .getParent()
    .update(false)

    expect(res.getStatment()).toEqual("UPDATE INTO\n\ttest\nSET\n\tid = ?\nWHERE\n\tid = ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Update ignore", () => {
    const res = QB
    .from("test")
    .where()
    .andEq("id", 1)
    .getParent()
    .set()
    .add("id", 1)
    .getParent()
    .update(true)

    expect(res.getStatment()).toEqual("UPDATE IGNORE INTO\n\ttest\nSET\n\tid = ?\nWHERE\n\tid = ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Replace", () => {
    const res = QB
    .from("test")
    .where()
    .andEq("id", 1)
    .getParent()
    .set()
    .add("id", 1)
    .getParent()
    .replace()

    expect(res.getStatment()).toEqual("REPLACE INTO\n\ttest\nSET\n\tid = ?;");
    expect(res.getData()).toEqual([1]);
})

test("Insert", () => {
    const res = QB
    .from("test")
    .set()
    .add("id", 1)
    .getParent()
    .insert(false)

    expect(res.getStatment()).toEqual("INSERT INTO\n\ttest\nSET\n\tid = ?;");
    expect(res.getData()).toEqual([1]);
})

test("Insert ignore", () => {
    const res = QB
    .from("test")
    .set()
    .add("id", 1)
    .getParent()
    .insert(true)

    expect(res.getStatment()).toEqual("INSERT IGNORE INTO\n\ttest\nSET\n\tid = ?;");
    expect(res.getData()).toEqual([1]);
})

test("Insert ALL", () => {
    const res = QB
    .from("test")
    .insertAll(
        [
            {
                Banned: false,
                Happy: true,
                Health: 100,
                Name: "John"
            },
            {
                Banned: true,
                Happy: true,
                Health: 15,
                Name: "John"
            },
            {
                Banned: false,
                Happy: false,
                Health: 42,
                Name: "axel"
            }
        ],
        false
    )

    expect(res.getStatment()).toEqual("INSERT INTO test (Banned,Happy,Health,Name) VALUES\n\t(?,?,?,?),\n\t(?,?,?,?),\n\t(?,?,?,?);");
    expect(res.getData()).toEqual([false, true, 100, "John", true, true, 15, "John", false, false, 42, "axel"]);
})

test("Insert ALL INGORE", () => {
    const res = QB
    .from("test")
    .insertAll(
        [
            {
                Banned: false,
                Happy: true,
                Health: 100,
                Name: "John"
            },
            {
                Banned: true,
                Happy: true,
                Health: 15,
                Name: "John"
            },
            {
                Banned: false,
                Happy: false,
                Health: 42,
                Name: "axel"
            }
        ],
        true
    )

    expect(res.getStatment()).toEqual("INSERT IGNORE INTO test (Banned,Happy,Health,Name) VALUES\n\t(?,?,?,?),\n\t(?,?,?,?),\n\t(?,?,?,?);");
    expect(res.getData()).toEqual([false, true, 100, "John", true, true, 15, "John", false, false, 42, "axel"]);
})

test("Replace ALL", () => {
    const res = QB
    .from("test")
    .replaceAll(
        [
            {
                Banned: false,
                Happy: true,
                Health: 100,
                Name: "John"
            }
        ]
    )

    expect(res.getStatment()).toEqual("REPLACE INTO test (Banned,Happy,Health,Name) VALUES\n\t(?,?,?,?);");
    expect(res.getData()).toEqual([false, true, 100, "John"]);
})

test("Insert ALL no data", () => {
    const res = QB
    .from("test")
    .insertAll([], false)

    expect(res.getStatment()).toEqual("");
    expect(res.getData()).toEqual([]);
})
