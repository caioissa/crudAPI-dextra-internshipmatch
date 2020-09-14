const { GoogleSpreadsheet } = require('google-spreadsheet');

class GoogleSheetsAPI {
    constructor(sheet) {
        this.sheet = sheet;
    }

    static async build(sheetId) {
        const doc = new GoogleSpreadsheet(sheetId);
        await doc.useServiceAccountAuth(require('../../json/credentials.json'));
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        return new GoogleSheetsAPI(sheet);
    }

    async getRows() {
        const rows = await this.sheet.getRows();
        return rows;
    }

    async getRowByIndex(idx) {
        const rows = await this.getRows();
        return rows[idx];
    }

    async editColumnInRow(idx, column, content) {
        const row = await this.getRowByIndex(idx);
        row[column] = content;
        await row.save();
        return row[column];
    }
}

module.exports = { GoogleSheetsAPI };