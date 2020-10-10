const teamParser = require('../service/parser/teamParser')
const internParser = require('../service/parser/internParser');
const SheetsService = require('../service/SheetsService')
var authApi
var teamService, internService


const { OAuth2Client } = require('google-auth-library');

const { checkIfDextraEmail } = require('../utils/user');

const buildTeamService = async (auth) => {
    authApi = auth;
    teamService = await SheetsService.build(
        process.env.TEAMS_SHEET_ID, teamParser)
}

const buildInternService = async (auth) => {
    authApi = auth;
    internService = await SheetsService.build(
        process.env.INTERNS_SHEET_ID, internParser);
}

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
            var isIntern;
            if(internService.sheetsAPI.filterRows(row => row['Email Address'] === email) != null ){
                isIntern = true;
            }
            //filterRows(row => row['Email Address'] === email)

            if(teamService.sheetsAPI.filterRows(row => row['Email Address'] === email) != null ){
                isIntern = false;
            }
            //if (ta na tabela de intern) isIntern = true;
            //else if (ta na tabela de team) isIntern = false;

            if (!email) {
                throw { message: 'Error verifying the token' };
            }
            //CHECK if isIntern === undefined
            if (!checkIfDextraEmail(email) || isIntern === undefined) {
                throw { message: 'Unauthorized email account' };
            }

            //Devolve isIntern Junto
            return {
                email: email,
                name: given_name,
                isIntern: isIntern
            };
        } catch (e) {
            console.error('Error trying to verify token', e.message);
            return null;
        }
    }
}

module.exports = GoogleAuthAPI;