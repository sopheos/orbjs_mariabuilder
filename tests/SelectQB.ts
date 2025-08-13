import QB from "./lib/QB"

test("Simple select *", () => {
    const res = QB
    .from("test")
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest;");
    expect(res.getData()).toEqual([]);
})

test("Select multiple column", () => {
    const res = QB
    .from("test")
    .select()
    .column("Hello", "World")
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\tHello\n\tWorld\nFROM\n\ttest;");
    expect(res.getData()).toEqual([]);
})

test("Select distinct rows", () => {
    const res = QB
    .from("test")
    .select()
    .distinct()
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT DISTINCT\n\t*\nFROM\n\ttest;");
    expect(res.getData()).toEqual([]);
})

test("Select all rows", () => {
    const res = QB.from("test")
    .select()
    .distinct()
    .duplicate()
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest;");
    expect(res.getData()).toEqual([]);
})
