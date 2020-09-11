const { GoogleSpreadsheet } = require('google-spreadsheet');

const { toArray, toString } = require('../utils/array');

const getSheet = async sheetId => {
    const doc = new GoogleSpreadsheet(sheetId);
    await doc.useServiceAccountAuth(require('../../json/credentials.json'));
    await doc.loadInfo();
    return doc.sheetsByIndex[0];
}

const getAll = async (sheet, rowParser) => {
    const rows = await sheet.getRows();
    const res = rows.map(rowParser)
    return res;
}

const getById = async (sheet, id, rowParser) => {
    const rows = await sheet.getRows();
    const row = rows[id];
    return rowParser(row, id);
}

const writeChoices = async (sheet, id, choices) => {
    const rows = await sheet.getRows();
    const row = rows[id];
    row['Escolhas'] = toString(choices);
    await row.save();
    return toArray(row['Escolhas']);
}

module.exports = { getSheet, getAll, getById, writeChoices };