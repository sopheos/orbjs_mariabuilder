import QB from "#/QB"
import QBFrag from "#/QBFrag/QBFrag";

test("Simple Have", () => {
    const res = QB
    .from("test")
    .having()
    .and("id = ?", 1)
    .or("id = ?", 1)
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid = ?\n\tOR id = ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Have equal", () => {
    const res = QB
    .from("test")
    .having()
    .andEq("id", 1)
    .orEq("id", 1)
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid = ?\n\tOR id = ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Have equal null", () => {
    const res = QB
    .from("test")
    .having()
    .andNull("id")
    .orNull("id")
    .andEq("id", null)
    .orEq("id", null)
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid IS NULL\n\tOR id IS NULL\n\tAND id IS NULL\n\tOR id IS NULL;");
    expect(res.getData()).toEqual([]);
})

test("Have not equal null", () => {
    const res = QB
    .from("test")
    .having()
    .andNotNull("id")
    .orNotNull("id")
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid IS NOT NULL\n\tOR id IS NOT NULL;");
    expect(res.getData()).toEqual([]);
})

test("Have not equal", () => {
    const res = QB
    .from("test")
    .having()
    .andNot("id", 1)
    .orNot("id", 1)
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid <> ?\n\tOR id <> ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Have in", () => {
    const res = QB
    .from("test")
    .having()
    .andIn("id", [1, 2, 3])
    .orIn("id", [1, 2, 3])
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid IN (?, ?, ?)\n\tOR id IN (?, ?, ?);");
    expect(res.getData()).toEqual([1, 2, 3, 1, 2, 3]);
})

test("Have not in", () => {
    const res = QB
    .from("test")
    .having()
    .andNotIn("id", [1, 2, 3])
    .orNotIn("id", [1, 2, 3])
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid NOT IN (?, ?, ?)\n\tOR id NOT IN (?, ?, ?);");
    expect(res.getData()).toEqual([1, 2, 3, 1, 2, 3]);
})

test("Have superior", () => {
    const res = QB
    .from("test")
    .having()
    .andSup("id", 1)
    .orSup("id", 1)
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid > ?\n\tOR id > ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Have inferior", () => {
    const res = QB
    .from("test")
    .having()
    .andInf("id", 1)
    .orInf("id", 1)
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid < ?\n\tOR id < ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Have superior equal", () => {
    const res = QB
    .from("test")
    .having()
    .andSupEq("id", 1)
    .orSupEq("id", 1)
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid >= ?\n\tOR id >= ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Have inferior equal", () => {
    const res = QB
    .from("test")
    .having()
    .andInfEq("id", 1)
    .orInfEq("id", 1)
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid <= ?\n\tOR id <= ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Have like", () => {
    const res = QB
    .from("test")
    .having()
    .andLike("days", "T%")
    .orLike("days", "T%")
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tdays LIKE ?\n\tOR days LIKE ?;");
    expect(res.getData()).toEqual(["T%", "T%"]);
})

test("Have not like", () => {
    const res = QB
    .from("test")
    .having()
    .andNotLike("days", "T%")
    .orNotLike("days", "T%")
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tdays NOT LIKE ?\n\tOR days NOT LIKE ?;");
    expect(res.getData()).toEqual(["T%", "T%"]);
})

test("Have parenthesis", () => {
    const res = QB
    .from("test")
    .having()
    .and("id = ?", 1)
    .andGroupStart()
    .or("id = ?", 2)
    .or("id = ?", 3)
    .orGroupStart()
    .andLike("days", "T%")
    .andNotLike("days", "T%")
    .groupEnd()
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid = ?\n\tAND (\n\t\tid = ?\n\t\tOR id = ?\n\t\tOR (\n\t\t\tdays LIKE ?\n\t\t\tAND days NOT LIKE ?\n\t\t)\n\t);");
    expect(res.getData()).toEqual([1, 2, 3, "T%", "T%"]);
})

test("Have not null", () => {
    const res = QB
    .from("test")
    .having()
    .andNot("id", null)
    .orNot("id", null)
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid IS NOT NULL\n\tOR id IS NOT NULL;");
    expect(res.getData()).toEqual([]);
})

test("Have in subquery", () => {
    const subquery: QBFrag = QB.from("hey").read();
    const res = QB
    .from("test")
    .having()
    .andIn("id", subquery)
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid IN (\n\t\tSELECT\n\t\t\t*\n\t\tFROM\n\t\t\they;\n\t);");
    expect(res.getData()).toEqual([]);
})

test("Have multiple groups", () => {
    const res = QB
    .from("test")
    .having()
    .and("id = ?", 1)
    .andGroupStart()
    .andGroupStart()
    .or("id = ?", 2)
    .or("id = ?", 3)
    .groupEnd()
    .orGroupStart()
    .andLike("days", "T%")
    .andNotLike("days", "T%")
    .groupEnd()
    .groupEnd()
    .groupEnd()
    .groupEnd()
    .getParent()
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nHAVING\n\tid = ?\n\tAND (\n\t\t(\n\t\t\tid = ?\n\t\t\tOR id = ?\n\t\t)\n\t\tOR (\n\t\t\tdays LIKE ?\n\t\t\tAND days NOT LIKE ?\n\t\t)\n\t);");
    expect(res.getData()).toEqual([1, 2, 3, "T%", "T%"]);
})
