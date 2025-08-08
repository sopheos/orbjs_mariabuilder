import QB from "#/QB"

test("Simple Limit", () => {
    const res = QB
    .from("test")
    .limit(1)
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nLIMIT\n\t1;");
    expect(res.getData()).toEqual([]);
})

test("Limit offset", () => {
    const res = QB
    .from("test")
    .limit(1, 1)
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nLIMIT\n\t1\nOFFSET\n\t1;");
    expect(res.getData()).toEqual([]);
})

test("Limit offset incorect", () => {
    const res = QB
    .from("test")
    .limit(-1, 1)
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nOFFSET\n\t1;");
    expect(res.getData()).toEqual([]);

    const res2 = QB
    .from("test")
    .limit(1, -1)
    .read();

    expect(res2.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nLIMIT\n\t1;");
    expect(res2.getData()).toEqual([]);
})
