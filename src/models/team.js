const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
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
    description: {
        type: String,
        trim: true
    },
    ammountOfSpots: {
        type: Number,
        required: true
    },
    technologies: [{
        type: String,
        trim: true
    }],
    clients: [{
        type: String,
        trim: true
    }],
    languages: [{
        type: String,
        trim: true
    }],
    photo: {
        type: Buffer,
        required: true
    },
    choices: [{
        intern: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Intern'
        }
    }]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;