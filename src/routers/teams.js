const express = require('express')

const teamParser = require('../service/parser/teamParser');
const SheetsService = require('../service/SheetsService');

var teamService;
var authApi;
const teamRouter = express.Router();

const buildTeamService = async (auth) => {
    authApi = auth;
    teamService = await SheetsService.build(
        '1OhISMkqyP1sgs1adu-jh5go1PgcQerzQeTjbcyEhx3M', teamParser);
}

teamRouter.post('/teams/choices/:email', async(req, res) => {
    try {
        const choices = req.body.choices
        if (!choices) {
            return res.status(400).send()
        }
        if(!(await teamService.writeChoicesByEmail(req.params.email, choices))){
            return res.status(404).send()
        }
        res.status(200).send({message: 'OK'})
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

teamRouter.get('/teams/choices', async(req, res) => {
    try {
        const teams = await teamService.getAll();
        res.status(200).send(teams)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = { teamRouter, buildTeamService }