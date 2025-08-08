import QB from "#/QB"

test("Order by asc", () => {
    const res = QB
    .from("test")
    .orderBy()
    .asc("Hello", "World")
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nORDER BY\n\tHello ASC,\n\tWorld ASC;");
    expect(res.getData()).toEqual([]);
})

test("Order by desc", () => {
    const res = QB
    .from("test")
    .orderBy()
    .desc("Hello", "World")
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nORDER BY\n\tHello DESC,\n\tWorld DESC;");
    expect(res.getData()).toEqual([]);
})

test("Order by asc custom", () => {
    const res = QB
    .from("test")
    .orderBy()
    .ascCustom("nb_award",
        [{
            condition: "0",
            priority: 99
        },
        {
            condition: "?",
            priority: 0
        }],
        100,
        15
    )
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nORDER BY\n\tCASE nb_award\n\t\tWHEN 0 THEN 99\n\t\tWHEN ? THEN 0\n\t\tELSE 100\n\tEND ASC;");
    expect(res.getData()).toEqual([15]);
})

test("Order by desc custom", () => {
    const res = QB
    .from("test")
    .orderBy()
    .descCustom("nb_award",
        [{
            condition: "0",
            priority: 99
        },
        {
            condition: "?",
            priority: 0
        }],
        100,
        15
    )
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nORDER BY\n\tCASE nb_award\n\t\tWHEN 0 THEN 99\n\t\tWHEN ? THEN 0\n\t\tELSE 100\n\tEND DESC;");
    expect(res.getData()).toEqual([15]);
})
