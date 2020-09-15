const GoogleAuthAPI = require('../../src/api/GoogleAuthAPI');

var api;

test('Should connect to OAuth client', async () => {
    jest.setTimeout(10000);
    api = await GoogleAuthAPI.build();
    expect(api).not.toBeNull();
})