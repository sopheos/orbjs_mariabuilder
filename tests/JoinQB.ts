import QB from "./lib/QB"

test("Cross join", () => {
    const res = QB
    .from("test")
    .join()
    .cross("famousTable")
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\n\tCROSS JOIN famousTable;");
    expect(res.getData()).toEqual([]);
})

test("Inner join", () => {
    const res = QB
    .from("test")
    .join()
    .inner("famousTable", "test.id = famousTable.id")
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\n\tINNER JOIN famousTable ON test.id = famousTable.id;");
    expect(res.getData()).toEqual([]);
})

test("Left join", () => {
    const res = QB
    .from("test")
    .join()
    .left("famousTable", "test.id = famousTable.id")
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\n\tLEFT JOIN famousTable ON test.id = famousTable.id;");
    expect(res.getData()).toEqual([]);
})

test("Right join", () => {
    const res = QB
    .from("test")
    .join()
    .right("famousTable", "test.id = famousTable.id")
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\n\tRIGHT JOIN famousTable ON test.id = famousTable.id;");
    expect(res.getData()).toEqual([]);
})
