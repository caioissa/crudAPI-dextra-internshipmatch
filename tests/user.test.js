const { checkIfDextraEmail } = require("../src/utils/user");

test("Should correctly evaluate a dextra-sw email as true", () => {
    expect(checkIfDextraEmail("caioissa@gmail.com")).toBeTruthy();
});

test("Should correctly evaluate a non dextra-sw email as false", () => {
    expect(checkIfDextraEmail("caioissa@hotmail.com")).toBeFalsy();
});