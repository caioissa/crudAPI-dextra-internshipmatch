const express = require('express');
const cors = require('cors');

const app = express();
const { router, buildInternService, buildTeamService } = require('./routers/router');
const GoogleAuthAPI = require('./api/GoogleAuthAPI');

var authApi, internService, teamService;

const setup = async () => {
    authApi = await GoogleAuthAPI.build();
    internService = await buildInternService();
    teamService = await buildTeamService();
}

app.use(cors());

app.use(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({ error: 'No credentials sent!' });
    }
    //recebe também isIntern
    const { email, name, isIntern } = await authApi.verify(token.split(' ')[1], internService, teamService);
    if (email === null) {
        return res.status(403).send({ error: 'Invalid token.' });
    }
    res.locals.email = email;
    res.locals.name = name;
    res.locals.isIntern = isIntern;
    next();
});

app.use(express.json());
app.use(router);

module.exports = { app, setup }