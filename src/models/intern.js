const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    nickname: {
        type: String,
        trim: true
    },
    birthDate: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    knowsTechnologies: [{
        type: String,
        trim: true
    }],
    learnTechnologies: [{
        type: String,
        trim: true
    }],
    languages: [{
        type: String,
        trim: true
    }],
    photo: {
        type: String,
        required: true
    },
    choices: [{
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }
    }]
});

const Intern = mongoose.model('Intern', internSchema);

module.exports = Intern;