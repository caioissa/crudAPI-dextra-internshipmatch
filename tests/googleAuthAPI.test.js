require("dotenv").config({
    path: ".env.testing"
});

const GoogleAuthAPI = require('../src/api/GoogleAuthAPI');

var api;
test('Should connect to OAuth client', async () => {
    console.log(process.env.GOOGLE_CLIENT_ID);
    jest.setTimeout(10000);
    api = await GoogleAuthAPI.build();
    expect(api).not.toBeNull();
});

test('Should get an error verifying invalid token', async () => {
    const payload = await api.verify("invalidToken");
    expect(payload).toBeNull();
});