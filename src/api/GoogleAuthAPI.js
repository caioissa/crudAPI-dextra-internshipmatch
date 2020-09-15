const fs = require('fs');

const { OAuth2Client } = require('google-auth-library');

const { checkIfDextraEmail } = require('../utils/user');

class GoogleAuthAPI {
    constructor(client, client_id) {
        this.client = client;
        this.client_id = client_id;
    }

    static async build() {
        try {
            const auth = await fs.promises.readFile('json/auth.json');
            const client_id = JSON.parse(auth).client_id;
            const client = new OAuth2Client(client_id);
            return (client !=null && client_id != null) ? new GoogleAuthAPI(client, client_id) : null;
        } catch (e) {
            console.error('Error trying to connect to OAuth client', e.message);
            return null;
        }
    }

    async verify(token) {
        try{
            const ticket = await this.client.verifyIdToken({
                idToken: token,
                audient: this.client_id
            });
            const { email } = ticket.getPayload();
            
            if (!email) {
                throw { message: 'Error verifying the token' };
            }
            if (!checkIfDextraEmail(email)) {
                throw { message: 'Unauthorized email account' };
            }

            return ticket.getPayload();
        } catch (e) {
            console.error('Error trying to verify token', e.message);
            return null;
        }
    }
}

module.exports = GoogleAuthAPI;