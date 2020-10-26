const express = require('express');
const teamParser = require('../service/parser/teamParser');
const internParser = require('../service/parser/internParser');
const SheetsService = require('../service/SheetsService');

var teamService, internService;
const router = express.Router();

const buildTeamService = async () => {
    teamService = await SheetsService.build(
        process.env.TEAMS_SHEET_ID, teamParser);
    return teamService;
}

const buildInternService = async () => {
    internService = await SheetsService.build(
        process.env.INTERNS_SHEET_ID, internParser);
    return internService;
}

router.post('/auth', (req, res) => {
    res.status(200).send({name: res.locals.name});
})

router.get('/', async (req, res) => {
    try {
        if (!res.locals.isIntern) {
            const interns = await internService.getAll();
            const response = interns.map(i => ({
                id: i.id,
                name: i.name,
                photo_url: i.photo_url
            }))
            res.status(200).send(response)
        } else {
            const teams = await teamService.getAll();
            const response = teams.map(i => ({
                id: i.id,
                name: i.name,
                photo_url: i.photo_url
            }))
            res.status(200).send(response)
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/info/:id', async (req, res) => {
    try {
        if (!res.locals.isIntern) {
            const id = parseInt(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).send()
            }
            const interns = await internService.getById(id);
            if (!interns) {
                return res.status(404).send()
            }
            res.status(200).send(interns)
        } else {
            const id = parseInt(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).send()
            }
            const teams = await teamService.getById(id);
            if (!teams) {
                return res.status(404).send()
            }
            res.status(200).send(teams)
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/choices', async (req, res) => {
    try {
        if (!res.locals.isIntern) {
            const choices = req.body.choices;
            if (!choices) {
                return res.status(400).send();
            }
            if (!(await teamService.writeChoicesByEmail(res.locals.email, choices))) {
                return res.status(404).send();
            }
            res.status(200).send({ message: 'OK' })
        } else {
            const choices = req.body.choices;
            if (!choices) {
                return res.status(400).send();
            }
            if (!(await internService.writeChoicesByEmail(res.locals.email, choices))) {
                return res.status(404).send();
            }
            res.status(200).send({ message: 'OK' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.get('/choices', async (req, res) => {
    try {
        if (!res.locals.isIntern) {
            const teams = await teamService.getAll();
            res.status(200).send(teams);
        } else {
            const teams = await internService.getAll();
            res.status(200).send(teams);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = { router, buildInternService, buildTeamService };