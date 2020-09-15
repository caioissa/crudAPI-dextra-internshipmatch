const GoogleSheetsAPI = require('../api/googleSheetsAPI');
const parser = require('./parser/internParser');
const toString = require('../utils/string');
const toArray = require('../utils/array');

const SHEET_ID = '1ZCh7lPkzcnT1vTewM3pnDXrZwock_Avm4atEgxCxnrY';

class InternService {
    constructor(sheetsAPI) {
        this.sheetsAPI = sheetsAPI;
    }

    static async build() {
        const sheetsAPI = await GoogleSheetsAPI.build(SHEET_ID);
        if (sheetsAPI === null) {
            return null;
        }
        return new InternService(sheetsAPI);
    }

    async getInterns() {
        try{
            const rows = await this.sheetsAPI.getRows();
            return rows.map(parser);
        } catch (e) {
            console.error(`Error trying to parse rows`, e.message);
            return null;
        }
        
    }

    async getInternById(id) {
        const row = await this.sheetsAPI.getRowByIndex(id);
        if (row === null) {
            return null;
        }
        try{
            return parser(row, id);
        } catch (e) {
            console.error(`Error trying to parse row`, e.message);
            return null;
        }
    }

    async writeInternChoices(id, choices) {
        try {
            if (choices.length !== 4) {
                throw { message: 'Choices must be 4 items long' };
            }
            return toArray(await this.sheetsAPI.editColumnInRow(id, 'Escolhas', toString(choices)));
        } catch (e) {
            console.error(`Error trying to write choices`, e.message);
            return null;
        }
    }
}

module.exports = InternService;