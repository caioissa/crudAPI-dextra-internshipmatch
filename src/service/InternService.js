const { GoogleSheetsAPI } = require('../api/googleSheetsAPI');
const { parser } = require('./parser/internParser');
const { toString } = require('../utils/string');
const { toArray } = require('../utils/array');

const SHEET_ID = '1ZCh7lPkzcnT1vTewM3pnDXrZwock_Avm4atEgxCxnrY';

class InternService {
    constructor(sheetsAPI) {
        this.sheetsAPI = sheetsAPI;
    }

    static async build() {
        const sheetsAPI = await GoogleSheetsAPI.build(SHEET_ID);
        return new InternService(sheetsAPI);
    }

    async getInterns() {
        const rows = await this.sheetsAPI.getRows();
        return rows.map(parser);
    }

    async getInternById(id) {
        const row = await this.sheetsAPI.getRowByIndex(id);
        return parser(row, id);
    }

    async writeInternChoices(id, choices) {
        return toArray(await this.sheetsAPI.editColumnInRow(id, 'Escolhas', toString(choices)));
    }
}

module.exports = { InternService };