const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tutorSchema = new Schema({
    // name, email, classes, rate, bio, headshot
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    courses: { // can adjust this accordingly
        type: [String],
        required: true
    },

    rate: {
        type: Number,
        required: true
    },

    bio: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Tutor', tutorSchema)