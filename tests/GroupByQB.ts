import QB from "#/QB";

test("Simple group by", () => {
    const res = QB
    .from("test")
    .groupBy("id", "name")
    .read();

    expect(res.getStatement()).toEqual("SELECT\n\t*\nFROM\n\ttest\nGROUP BY\n\tid,\n\tname;");
    expect(res.getData()).toEqual([]);
})
