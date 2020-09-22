const { OAuth2Client } = require('google-auth-library');

const { checkIfDextraEmail } = require('../utils/user');

class GoogleAuthAPI {
    constructor(client, client_id) {
        this.client = client;
        this.client_id = client_id;
    }

    static async build() {
        try {
            const client_id = process.env.GOOGLE_CLIENT_ID;
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
            if (!ticket) {
                throw { message: 'Error fetching ticket.'}
            }

            const { email } = ticket.getPayload();
            
            if (!email) {
                throw { message: 'Error verifying the token' };
            }
            if (!checkIfDextraEmail(email)) {
                throw { message: 'Unauthorized email account' };
            }

            return email;
        } catch (e) {
            console.error('Error trying to verify token', e.message);
            return null;
        }
    }
}

module.exports = GoogleAuthAPI;