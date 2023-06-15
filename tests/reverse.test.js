const { reverse } = require("../utils/for_testing");


test("palindrome of react", () => {
    const result = reverse("react");

    expect(result).toBe("tcaer");
});