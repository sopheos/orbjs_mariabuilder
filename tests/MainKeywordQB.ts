import QB from "../lib/QB";

test("Count", () => {
    const res = QB
    .from("test")
    .count()

    expect(res.getStatement()).toEqual("SELECT\n\tCOUNT(*) AS sum\nFROM\n\ttest;");
    expect(res.getData()).toEqual([]);
})

test("Delete", () => {
    const res = QB
    .from("test")
    .where()
    .andEq("id", 1)
    .getParent()
    .delete()

    expect(res.getStatement()).toEqual("DELETE FROM\n\ttest\nWHERE\n\tid = ?;");
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

    expect(res.getStatement()).toEqual("UPDATE test\nSET\n\tid = ?\nWHERE\n\tid = ?;");
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

    expect(res.getStatement()).toEqual("UPDATE IGNORE test\nSET\n\tid = ?\nWHERE\n\tid = ?;");
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

    expect(res.getStatement()).toEqual("REPLACE INTO\n\ttest\nSET\n\tid = ?;");
    expect(res.getData()).toEqual([1]);
})

test("Insert", () => {
    const res = QB
    .from("test")
    .set()
    .add("id", 1)
    .getParent()
    .insert(false)

    expect(res.getStatement()).toEqual("INSERT INTO\n\ttest\nSET\n\tid = ?;");
    expect(res.getData()).toEqual([1]);
})

test("Insert ignore", () => {
    const res = QB
    .from("test")
    .set()
    .add("id", 1)
    .getParent()
    .insert(true)

    expect(res.getStatement()).toEqual("INSERT IGNORE INTO\n\ttest\nSET\n\tid = ?;");
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

    expect(res.getStatement()).toEqual("INSERT INTO test (Banned,Happy,Health,Name) VALUES\n\t(?,?,?,?),\n\t(?,?,?,?),\n\t(?,?,?,?);");
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

    expect(res.getStatement()).toEqual("INSERT IGNORE INTO test (Banned,Happy,Health,Name) VALUES\n\t(?,?,?,?),\n\t(?,?,?,?),\n\t(?,?,?,?);");
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

    expect(res.getStatement()).toEqual("REPLACE INTO test (Banned,Happy,Health,Name) VALUES\n\t(?,?,?,?);");
    expect(res.getData()).toEqual([false, true, 100, "John"]);
})

test("Insert ALL no data", () => {
    const res = QB
    .from("test")
    .insertAll([], false)

    expect(res.getStatement()).toEqual("");
    expect(res.getData()).toEqual([]);
})

test("Get parent of result", () => {
    expect(() => {
    QB
    .from("test")
    .where()
    .andEq("id", 1)
    .getParent()
    .read()
    .getParent();
    }).toThrow("No parent found");
})
