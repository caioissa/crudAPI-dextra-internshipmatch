const GoogleSheetsAPI = require('../../src/api/googleSheetsAPI');

var correctApi;

test('Should connect to GoogleSheetsAPI', async () => {
    jest.setTimeout(10000);
    correctApi = await GoogleSheetsAPI.build('1ZCh7lPkzcnT1vTewM3pnDXrZwock_Avm4atEgxCxnrY');
    expect(correctApi).not.toBeNull();
})

test('Should get an error connecting with a nonexisting id', async () => {
    const api = await GoogleSheetsAPI.build('1ZCh7lPkzcnT1vTewM3pnDXrZwock_Avm4atEgaaaaaa');
    expect(api).toBeNull();
})

test('Should get an error connecting to an unauthorized sheet', async () => {
    const api = await GoogleSheetsAPI.build('1phh0z01kXvjp0yuqkwhl9TcmEjhyjtyFPCIRvkxpxPc');
    expect(api).toBeNull();
})

test('Should get an error trying to fetch row out of bounds', async () => {
    const row = await correctApi.getRowByIndex(300);
    expect(row).toBeNull();
})

test('Should get an error trying to edit row out of bounds', async () => {
    const edit = await correctApi.editColumnInRow(300, 'Escolhas', 'a;b;c;d');
    expect(edit).toBeNull();
})

test('Should get an error trying to edit unexisting column', async () => {
    const edit = await correctApi.editColumnInRow(0, 'Coluna Estranha', 'a;b;c;d');
    expect(edit).toBeNull();
})

test('Should correctly edit row', async () => {
    jest.setTimeout(10000);
    var row = await correctApi.getRowByIndex(0);
    const past_choices = row['Escolhas'];
    const new_choices = '1;2;3;4';
    const choices = await correctApi.editColumnInRow(0, 'Escolhas', new_choices);
    expect(choices).toEqual(new_choices);
    await correctApi.editColumnInRow(0, past_choices);
    row = await correctApi.getRowByIndex(0);
    expect(row['Escolhas']).toEqual(past_choices);
})