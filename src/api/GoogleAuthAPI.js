const { OAuth2Client } = require('google-auth-library');

const { checkIfDextraEmail } = require('../utils/user');

class GoogleAuthAPI {
    constructor(client, clientId) {
        this.client = client;
        this.clientId = clientId;
    }

    static async build() {
        try {
            const clientId = process.env.GOOGLE_CLIENT_ID;
            const client = new OAuth2Client(clientId);
            return (client !=null && clientId != null) ? new GoogleAuthAPI(client, clientId) : null;
        } catch (e) {
            console.error('Error trying to connect to OAuth client', e.message);
            return null;
        }
    }

    async verify(token) {
        try{
            const ticket = await this.client.verifyIdToken({
                idToken: token,
                audient: this.clientId
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