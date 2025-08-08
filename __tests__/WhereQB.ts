import QB from "#/QB"

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
    .orIn("id", [1, 2, 3])
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid IN (?, ?, ?)\n\tOR id IN (?, ?, ?);");
    expect(res.getData()).toEqual([1, 2, 3, 1, 2, 3]);
})

test("Where not in", () => {
    const res = QB
    .from("test")
    .where()
    .andNotIn("id", [1, 2, 3])
    .orNotIn("id", [1, 2, 3])
    .getParent()
    .read();

    expect(res.getStatment()).toEqual("SELECT\n\t*\nFROM\n\ttest\nWHERE\n\tid NOT IN (?, ?, ?)\n\tOR id NOT IN (?, ?, ?);");
    expect(res.getData()).toEqual([1, 2, 3, 1, 2, 3]);
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
