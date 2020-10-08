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

            const { email, given_name } = ticket.getPayload();
            
            //VERIFICA email nas planilhas
            //var isIntern;
            //if (ta na tabela de intern) isIntern = true;
            //else if (ta na tabela de team) isIntern = false;

            if (!email) {
                throw { message: 'Error verifying the token' };
            }
            //CHECK if isIntern === undefined
            if (!checkIfDextraEmail(email)) {
                throw { message: 'Unauthorized email account' };
            }

            //Devolve isIntern Junto
            return {
                email: email,
                name: given_name
            };
        } catch (e) {
            console.error('Error trying to verify token', e.message);
            return null;
        }
    }
}

module.exports = GoogleAuthAPI;