const express = require('express')

const app = express();
const stagsRouter = require('./router/stags')
const teamsRouter = require('./router/teams')

app.use(express.json());
app.use(stagsRouter);
app.use(teamsRouter);

module.exports = app