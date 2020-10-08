const express = require('express');
const cors = require('cors');

const app = express();
const { internRouter, buildInternService } = require('./routers/interns');
const { teamRouter, buildTeamService } = require('./routers/teams');
const { authRouter } = require('./routers/auth');
const GoogleAuthAPI = require('./api/GoogleAuthAPI');

var authApi;

const setup = async () => {
    authApi = await GoogleAuthAPI.build();
    await buildInternService(authApi);
    await buildTeamService(authApi);
}

app.use(cors());

app.use(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).send({ error: 'No credentials sent!' });
    }
    //recebe também isIntern
    const { email, name } = await authApi.verify(token.split(' ')[1]);
    if (email === null) {
        return res.status(403).send({ error: 'Invalid token.' });
    }
    res.locals.email = email;
    res.locals.name = name;
    //seta res.locals.isIntern = isIntern;
    next();
});

app.use(express.json());
app.use(internRouter);
app.use(teamRouter);
app.use(authRouter);

module.exports = { app, setup }