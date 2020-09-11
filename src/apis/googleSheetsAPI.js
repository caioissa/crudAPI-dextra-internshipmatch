const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const TOKEN_PATH = 'json/token.json';
const CRED_PATH = 'json/credentials.json';

async function getSheet() {
    const doc = new GoogleSpreadsheet('1ZCh7lPkzcnT1vTewM3pnDXrZwock_Avm4atEgxCxnrY');
    await doc.useServiceAccountAuth(require('../../json/credentials.json'));
    await doc.loadInfo();
    return doc.sheetsByIndex[0];
}

async function getStags() {
    const sheet = await getSheet();
    const rows = await sheet.getRows();
    const res = rows.map((row, i) => {
        return ({
            id: i,
            name: row['Nome completo'],
            photo_url: row['Foto de perfil']
        });
    })
    return res;
}

async function getStagById(id) {
    const sheet = await getSheet();
    const rows = await sheet.getRows();
    const row = rows[id];
    return {
        id: id,
        name: row['Nome completo'],
        email: row['Email Address'],
        nickname: row['Apelido'],
        photo_url: row['Foto de perfil'],
        knows: row['Tecnologias que tem experiência'].split(';'),
        wants: row['Tecnologias que quer aprender'].split(';'),
        languages: row['Idiomas'].split(';')
    }
}

async function getStagChoices() {
    const sheet = await getSheet();
    const rows = await sheet.getRows();
    const res = rows.map((row, i) => {
        return ({
            id: i,
            name: row['Nome completo'],
            username: row['Email Address'].split('@')[0],
            photo_url: row['Foto de perfil'],
            knows: row['Tecnologias que tem experiência'].split(';'),
            wants: row['Tecnologias que quer aprender'].split(';'),
            choices: row['Escolhas'].split(';'),
            languages: row['Idiomas'].split(';')
        });
    })
    return res;
}

async function writeStagChoices(id, choices) {
    const sheet = await getSheet();
    const rows = await sheet.getRows();
    const row = rows[id];
    row['Escolhas'] = choices.join(';')
    await row.save();
    return row['Escolhas'].split(';');
}

module.exports = {
    getStagById,
    getStags,
    writeStagChoices,
    getStagChoices
}