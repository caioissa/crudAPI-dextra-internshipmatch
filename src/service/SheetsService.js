const GoogleSheetsAPI = require('./src/api/GoogleSheetsAPI');
const { toString } = require('../utils/string');
const { toArray } = require('../utils/array');

class SheetsService {
    constructor(sheetsAPI, parser) {
        this.sheetsAPI = sheetsAPI;
        this.parser = parser;
    }

    static async build(sheetId, parser) {
        const sheetsAPI = await GoogleSheetsAPI.build(sheetId);
        return sheetsAPI != null ? new SheetsService(sheetsAPI, parser) : null;
    }

    async getAll() {
        try{
            const rows = await this.sheetsAPI.getRows();
            return rows != null ? rows.map(this.parser) : null;
        } catch (e) {
            console.error(`Error trying to parse rows`, e.message);
            return null;
        }
    }

    async getById(id) {
        try{
            const row = await this.sheetsAPI.getRowByIndex(id);
            return row != null ? this.parser(row, id) : null;
        } catch (e) {
            console.error(`Error trying to parse row`, e.message);
            return null;
        }
    }

    async writeChoicesByEmail(email, choices) {
        try {
            return toArray(await this.sheetsAPI.editColumnInRowByFilter('Escolhas', toString(choices), 
                row => row['Email Address'] === email));
        } catch (e) {
            console.error(`Error trying to write choices`, e.message);
            return null;
        }
    }
}

module.exports = SheetsService;