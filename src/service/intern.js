const { getSheet, getAll, getById, writeChoices } = require('../api/googleSheetsAPI');
const { parser } = require('./parser/internParser');

const SHEET_ID = '1ZCh7lPkzcnT1vTewM3pnDXrZwock_Avm4atEgxCxnrY';

const getInterns = async () => {
    const sheet = await getSheet(SHEET_ID);
    return await getAll(sheet, parser);
}

const getInternById = async id => {
    const sheet = await getSheet(SHEET_ID);
    return await getById(sheet, id, parser);
}

const writeInternChoices = async (id, choices) => {
    const sheet = await getSheet(SHEET_ID);
    return await writeChoices(sheet, id, choices);
}

module.exports = { getInterns, getInternById, writeInternChoices };