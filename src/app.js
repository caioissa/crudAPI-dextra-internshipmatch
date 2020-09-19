const express = require('express')

const app = express();
const { internRouter, buildInternService } = require('./routers/interns')
const { teamRouter, buildTeamService } = require('./routers/teams')

const setup = async () => {
    await buildInternService();
    await buildTeamService();
}

app.use(express.json());
app.use(internRouter);
app.use(teamRouter);

module.exports = { app, setup }