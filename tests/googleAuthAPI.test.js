require("dotenv").config({
    path: ".env.testing"
});

const GoogleAuthAPI = require('../src/api/GoogleAuthAPI');

test('Should connect to OAuth client', async () => {
    jest.setTimeout(10000);
    const api = await GoogleAuthAPI.build();
    expect(api).not.toBeNull();
});

test('Should get an error verifying invalid token', async () => {
    jest.setTimeout(10000);
    const api = await GoogleAuthAPI.build();
    const payload = await api.verify("invalidToken");
    expect(payload).toBeNull();
});