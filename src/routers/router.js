const express = require('express');
const mongoose = require("mongoose");

const Intern = require("../models/intern");
const Team = require("../models/team");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post('/auth', auth, (req, res) => {
    res.status(200).send({ name: res.locals.user.name });
})

router.get('/', auth, async (req, res) => {
    try {
        var data;
        if (!res.locals.isIntern) {
            data = await Intern.find();
        } else {
            data = await Team.find();
        }

        const response = data.map(i => ({
            id: i._id,
            name: i.name,
            photo: i.photo
        }));
        res.status(200).send(response);
    } catch (e) {
        console.error(e.message);
        res.status(500).send();
    }
});

router.post("/", async (req, res) => {
    try {
        const { isIntern, ...rest } = req.body;
        var user;
        if (isIntern) {
            user = new Intern(rest);
        } else {
            user = new Team(rest);
        }
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        console.error(e.message);
        res.status(500).send();
    }
});

router.get('/info/:id', auth, async (req, res) => {
    try {
        var data;
        const id = mongoose.Types.ObjectId(req.params.id);
        if (!res.locals.isIntern) {
            data = await Intern.findById(id).select("-choices");
        } else {
            data = await Team.findById(id).select("-choices");
        }

        if (!data) {
            return res.status(404).send();
        }
        res.status(200).send(data);
    } catch (e) {
        console.error(e.message);
        res.status(500).send();
    }
});

router.post('/choices', auth, async (req, res) => {
    try {
        const choices = req.body.choices;
        if (!choices) {
            return res.status(400).send({ error: "Please send the list of Choices" });
        }
        const user = res.locals.user;
        try{
            user.choices = choices.map(mongoose.Types.ObjectId);
        } catch (e) {
            return res.status(400).send({ error: "Please send a list of ObjectIds" });
        }
        await user.save();
    
        res.status(200).send({ message: 'OK' })
    } catch (e) {
        console.error(e.message);
        res.status(500).send();
    }
});

module.exports = router;