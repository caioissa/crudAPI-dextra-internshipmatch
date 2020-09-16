const GoogleSheetsAPI = require('../../src/api/GoogleSheetsAPI');

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
    const edit = await correctApi.editColumnInRowByIndex(300, 'Escolhas', 'a;b;c;d');
    expect(edit).toBeNull();
})

test('Should get an error trying to edit unexisting column', async () => {
    const edit = await correctApi.editColumnInRowByIndex(0, 'Coluna Estranha', 'a;b;c;d');
    expect(edit).toBeNull();
})

test('Should correctly edit row by index', async () => {
    jest.setTimeout(10000);
    var row = await correctApi.getRowByIndex(0);
    const past_choices = row['Escolhas'];
    const new_choices = 'a;b;c;d';
    const choices = await correctApi.editColumnInRowByIndex(0, 'Escolhas', new_choices);
    expect(choices).toEqual(new_choices);
    await correctApi.editColumnInRowByIndex(0, 'Escolhas', past_choices);
    row = await correctApi.getRowByIndex(0);
    expect(row['Escolhas']).toEqual(past_choices);
})

test('Should get an error trying to filter rows with invalid filter', async () => {
    const filteredRows = await correctApi.filterRows(row => row['Email Address'] === 'dummy');
    expect(filteredRows).toBeNull();
})

test('Should fetch a row by column', async () => {
    const filteredRows = await correctApi.filterRows(
        row => row['Email Address'] === 'caioissa96@gmail.com');
    const row = filteredRows[0];
    expect(row['Email Address']).toEqual('caioissa96@gmail.com');
})

test('Should get an error trying to edit an invalid filter', async () => {
    const edit = await correctApi.editColumnInRowByFilter('Escolhas', 'a;b;c;d', 
        row => row['Email Address'] === 'dummy');
    expect(edit).toBeNull();
})

test('Should get an error trying to edit an invalid column by filter', async () => {
    const edit = await correctApi.editColumnInRowByFilter('Coluna Estranha', 'a;b;c;d', 
        row => row['Email Address'] === 'caioissa96@gmail.com');
    expect(edit).toBeNull();
})

test('Should correctly edit row By Filter', async () => {
    jest.setTimeout(30000);
    const filter = row => row['Email Address'] === 'caioissa96@gmail.com';
    var row = (await correctApi.filterRows(filter))[0];
    const past_choices = row['Escolhas'];
    const new_choices = 'a;b;c;d';
    const choices = await correctApi.editColumnInRowByFilter('Escolhas', new_choices, filter);
    expect(choices).toEqual(new_choices);
    await correctApi.editColumnInRowByFilter('Escolhas', past_choices, filter);
    row = (await correctApi.filterRows(filter))[0];
    expect(row['Escolhas']).toEqual(past_choices);
})