const { GoogleSpreadsheet } = require('google-spreadsheet');

class GoogleSheetsAPI {
    constructor(sheet) {
        this.sheet = sheet;
    }

    static async build(sheetId) {
        try {
            const doc = new GoogleSpreadsheet(sheetId);
            await doc.useServiceAccountAuth({
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n')
            });
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

    async filterRows(filter) {
        try{
            const rows = await this.getRows();
            const filteredRows = rows.filter(filter);
            if (filteredRows.length === 0) {
                throw { message: 'No row met the conditions' };
            }
            return filteredRows;
        } catch (e) {
            console.error(`Error trying to fetch row by filter`, e.message);
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

    async editColumnInRowByFilter(column, content, filter) {
        try{
            const row = (await this.filterRows(filter))[0];
            if (row === null) {
                return null;
            }
            if (!(column in row)) {
                throw { message: 'Column not found' };
            }
            row[column] = content;
            await row.save();
            return row[column];
        } catch (e) {
            console.error(`Error trying to edit column ${column}`, e.message);
            return null;
        }
    }
}

module.exports = GoogleSheetsAPI;