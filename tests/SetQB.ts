import QB from "../lib/QB"

test("Simple set", () => {
    const res = QB
    .from("test")
    .set()
    .add("id", 1)
    .add("unsafeId", 1, true)
    .getParent()
    .insert(false);

    expect(res.getStatement()).toEqual("INSERT INTO\n\ttest\nSET\n\tid = ?,\n\tunsafeId = 1;");
    expect(res.getData()).toEqual([1]);
})

test("list set", () => {
    const res = QB
    .from("test")
    .set()
    .addList([["id", 1], ["UnsafeList", 15]])
    .addList([["id2", 1], ["UnsafeList2", 15]], true)
    .getParent()
    .insert(false);

    expect(res.getStatement()).toEqual("INSERT INTO\n\ttest\nSET\n\tid = ?,\n\tUnsafeList = ?,\n\tid2 = 1,\n\tUnsafeList2 = 15;");
    expect(res.getData()).toEqual([1, 15]);
})

test("unsafe set", () => {
    const res = QB
    .from("test")
    .set()
    .unsafe("id", 1)
    .getParent()
    .insert(false);

    expect(res.getStatement()).toEqual("INSERT INTO\n\ttest\nSET\n\tid = 1;");
    expect(res.getData()).toEqual([]);
})

test("unsafe list set", () => {
    const res = QB
    .from("test")
    .set()
    .listUnsafe([["id", 1], ["UnsafeList", 15]])
    .getParent()
    .insert(false);

    expect(res.getStatement()).toEqual("INSERT INTO\n\ttest\nSET\n\tid = 1,\n\tUnsafeList = 15;");
    expect(res.getData()).toEqual([]);
})

test("increment and decrement", () => {
    const res = QB
    .from("test")
    .set()
    .increment("id", 10)
    .decrement("id2", 10)
    .increment("id3")
    .decrement("id4")
    .getParent()
    .insert(false);

    expect(res.getStatement()).toEqual("INSERT INTO\n\ttest\nSET\n\tid = id + 10,\n\tid2 = id2 - 10,\n\tid3 = id3 + 1,\n\tid4 = id4 - 1;");
    expect(res.getData()).toEqual([]);
})
