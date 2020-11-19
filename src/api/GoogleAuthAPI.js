const { OAuth2Client } = require('google-auth-library');

const { checkIfDextraEmail } = require('../utils/user');
const Intern = require("../models/intern");
const Team = require("../models/team");

class GoogleAuthAPI {
    constructor(client, clientId) {
        this.client = client;
        this.clientId = clientId;
    }

    static async build() {
        try {
            const clientId = process.env.GOOGLE_CLIENT_ID;
            const client = new OAuth2Client(clientId);
            return (client && clientId) ? new GoogleAuthAPI(client, clientId) : null;
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
                throw { message: 'Error fetching ticket.' }
            }

            const { email } = ticket.getPayload();

            if (!email) {
                throw { message: 'Error verifying the token' };
            }
            
            const intern = await Intern.findOne({ email });
            const team = await Team.findOne({ email });

            if (!checkIfDextraEmail(email) || !(intern || team)) {
                throw { message: 'Unauthorized email account' };
            }

            if (intern) {
                return {
                    user: intern,
                    isIntern: true
                }
            } else {
                return {
                    user: team,
                    isIntern: false
                }
            }
        } catch (e) {
            console.error('Error trying to verify token', e.message);
            return null;
        }
    }
}

module.exports = GoogleAuthAPI;