const { GoogleSpreadsheet } = require('google-spreadsheet');

class GoogleSheetsAPI {
    constructor(sheet) {
        this.sheet = sheet;
    }

    static async build(sheetId) {
        try {
            const doc = new GoogleSpreadsheet(sheetId);
            await doc.useServiceAccountAuth(require('../../json/credentials.json'));
            await doc.loadInfo();
            const sheet = doc.sheetsByIndex[0];
            return new GoogleSheetsAPI(sheet);
        } catch (e) {
            console.error(`Error trying to create sheet with id ${sheetId}`, e.message);
            return null;
        }
    }

    async getRows() {
        try{
            const rows = await this.sheet.getRows();
            return rows;
        } catch (e) {
            console.error(`Error trying to retrieve rows`, e.message);
            return null;
        }
    }

    async getRowByIndex(idx) {
        try {
            const rows = await this.getRows();
            const row = rows[idx];
            if (!row) {
                throw { message: 'Index out of bounds' };
            }
            return row;
        } catch(e) {
            console.error(`Error trying to access row with idx ${idx}`, e.message);
            return null;
        }
    }

    async editColumnInRowByIndex(idx, column, content) {
        const row = await this.getRowByIndex(idx);
        if (row === null) {
            return null;
        }
        try {
            if (!(column in row)) {
                throw { message: 'Column not found' };
            }
            row[column] = content;
            await row.save();
            return row[column];
        } catch (e) {
            console.error(`Error trying to access column ${column}`, e.message);
            return null;
        }
    }
}

module.exports = GoogleSheetsAPI;