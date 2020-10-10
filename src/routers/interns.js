const express = require('express')
const internParser = require('../service/parser/internParser');
const SheetsService = require('../service/SheetsService');

var internService;
var authApi;
const internRouter = express.Router();

const buildInternService = async (auth) => {
    authApi = auth;
    internService = await SheetsService.build(
        process.env.INTERNS_SHEET_ID, internParser);
}

internRouter.get('/', async (req, res) => {
    try {
        const interns = await internService.getAll();
        const response = interns.map(i => ({
            id: i.id,
            name: i.name,
            photo_url: i.photo_url
        }))
        res.status(200).send(response)
    } catch (e) {
        res.status(500).send(e)
    }
})

internRouter.get('/info/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).send()
        }
        const interns = await internService.getById(id);
        if (!interns) {
            return res.status(404).send()
        }
        res.status(200).send(interns)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = { internRouter, buildInternService }