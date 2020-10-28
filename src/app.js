const express = require('express');
const cors = require('cors');

require("./db/mongoose");
const router = require('./routers/router');
const { setup } = require("./middlewares/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

module.exports = { app, setup };