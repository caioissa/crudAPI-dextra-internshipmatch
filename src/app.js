const express = require('express')
const cors = require('cors')

const app = express();
const { internRouter, buildInternService } = require('./routers/interns')
const { teamRouter, buildTeamService } = require('./routers/teams')
const GoogleAuthAPI = require('./api/GoogleAuthAPI')

var authApi;

const setup = async () => {
    authApi = await GoogleAuthAPI.build();
    await buildInternService(authApi);
    await buildTeamService(authApi);
}

app.use(cors())

app.use(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).send({ error: 'No credentials sent!' });
    }
    const auth = await authApi.verify(token.split(' ')[1]);
    if (auth === null) {
        return res.status(403).send({ error: 'Invalid token.' })
    }
    next();
  });
app.use(express.json());
app.use(internRouter);
app.use(teamRouter);



module.exports = { app, setup }