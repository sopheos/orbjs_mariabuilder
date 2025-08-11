import QB from "#/QB"
import QBFrag from "#/QBFrag/QBFrag";

test("Simple Where", () => {
    const res = QB
    .from("test")
    .where()
    .and("id = ?", 1)
    .or("id = ?", 1)
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid = ?\n\tOR id = ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Where equal", () => {
    const res = QB
    .from("test")
    .where()
    .andEq("id", 1)
    .orEq("id", 1)
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid = ?\n\tOR id = ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Where equal null", () => {
    const res = QB
    .from("test")
    .where()
    .andNull("id")
    .orNull("id")
    .andEq("id")
    .orEq("id")
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid IS NULL\n\tOR id IS NULL\n\tAND id IS NULL\n\tOR id IS NULL;");
    expect(res.getData()).toEqual([]);
})

test("Where not equal null", () => {
    const res = QB
    .from("test")
    .where()
    .andNotNull("id")
    .orNotNull("id")
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid IS NOT NULL\n\tOR id IS NOT NULL;");
    expect(res.getData()).toEqual([]);
})

test("Where not equal", () => {
    const res = QB
    .from("test")
    .where()
    .andNot("id", 1)
    .orNot("id", 1)
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid <> ?\n\tOR id <> ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Where in", () => {
    const res = QB
    .from("test")
    .where()
    .andIn("id", [1, 2, 3])
    .orIn(["you", "me"], [["jean", "michel"], ["john", "david"]])
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid IN (?, ?, ?)\n\tOR (you, me) IN (\n\t\t(?, ?),\n\t\t(?, ?)\n\t);");
    expect(res.getData()).toEqual([1, 2, 3, "jean", "michel", "john", "david"]);
})

test("Where not in", () => {
    const res = QB
    .from("test")
    .where()
    .andNotIn("id", [1, 2, 3])
    .orNotIn(["you", "me"], [["jean", "michel"], ["john", "david"]])
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid NOT IN (?, ?, ?)\n\tOR (you, me) NOT IN (\n\t\t(?, ?),\n\t\t(?, ?)\n\t);");
    expect(res.getData()).toEqual([1, 2, 3, "jean", "michel", "john", "david"]);
})

test("Where superior", () => {
    const res = QB
    .from("test")
    .where()
    .andSup("id", 1)
    .orSup("id", 1)
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid > ?\n\tOR id > ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Where inferior", () => {
    const res = QB
    .from("test")
    .where()
    .andInf("id", 1)
    .orInf("id", 1)
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid < ?\n\tOR id < ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Where superior equal", () => {
    const res = QB
    .from("test")
    .where()
    .andSupEq("id", 1)
    .orSupEq("id", 1)
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid >= ?\n\tOR id >= ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Where inferior equal", () => {
    const res = QB
    .from("test")
    .where()
    .andInfEq("id", 1)
    .orInfEq("id", 1)
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid <= ?\n\tOR id <= ?;");
    expect(res.getData()).toEqual([1, 1]);
})

test("Where like", () => {
    const res = QB
    .from("test")
    .where()
    .andLike("days", "T%")
    .orLike("days", "T%")
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tdays LIKE ?\n\tOR days LIKE ?;");
    expect(res.getData()).toEqual(["T%", "T%"]);
})

test("Where not like", () => {
    const res = QB
    .from("test")
    .where()
    .andNotLike("days", "T%")
    .orNotLike("days", "T%")
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tdays NOT LIKE ?\n\tOR days NOT LIKE ?;");
    expect(res.getData()).toEqual(["T%", "T%"]);
})

test("Where parenthesis", () => {
    const res = QB
    .from("test")
    .where()
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

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid = ?\n\tAND (\n\t\tid = ?\n\t\tOR id = ?\n\t\tOR (\n\t\t\tdays LIKE ?\n\t\t\tAND days NOT LIKE ?\n\t\t)\n\t);");
    expect(res.getData()).toEqual([1, 2, 3, "T%", "T%"]);
})

test("Where not null", () => {
    const res = QB
    .from("test")
    .where()
    .andNot("id")
    .orNot("id")
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid IS NOT NULL\n\tOR id IS NOT NULL;");
    expect(res.getData()).toEqual([]);
})

test("Where in subquery", () => {
    const subquery: QBFrag = QB.from("hey").read();
    const res = QB
    .from("test")
    .where()
    .andIn("id", subquery)
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid IN (\n\t\tSELECT\n\t\t\t*\n\t\tFROM\n\t\t\they;\n\t);");
    expect(res.getData()).toEqual([]);
})

test("Where multiple groups", () => {
    const res = QB
    .from("test")
    .where()
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

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid = ?\n\tAND (\n\t\t(\n\t\t\tid = ?\n\t\t\tOR id = ?\n\t\t)\n\t\tOR (\n\t\t\tdays LIKE ?\n\t\t\tAND days NOT LIKE ?\n\t\t)\n\t);");
    expect(res.getData()).toEqual([1, 2, 3, "T%", "T%"]);
})
