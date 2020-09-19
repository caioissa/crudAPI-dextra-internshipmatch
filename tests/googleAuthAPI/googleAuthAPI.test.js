const GoogleAuthAPI = require('../../src/api/GoogleAuthAPI');
const client = require('../static/googleOAuthClientMock');

test('Should connect to OAuth client', async () => {
    jest.setTimeout(10000);
    const api = await GoogleAuthAPI.build();
    expect(api).not.toBeNull();
})

var api = new GoogleAuthAPI(client, '');

test('Should get an error verifying invalid token', async () => {
    const payload = await api.verify(null);
    expect(payload).toBeNull();
})

test('Should get an error verifying non dextra token', async () => {
    const payload = await api.verify('dummy');
    expect(payload).toBeNull();
})

test('Should correctly verify a dextra email', async () => {
    const payload = await api.verify('dextra');
    expect(payload.email).toEqual('caio.issa@dextra-sw.com')
})