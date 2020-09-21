const express = require('express')

var authApi;
const authRouter = express.Router();

const buildAuth = (auth) => {
    authApi = auth;
}

authRouter.post('/auth', (req, res) => {
    res.status(200).send({message: 'Usuário Autenticado'})
})

module.exports = { authRouter, buildAuth }