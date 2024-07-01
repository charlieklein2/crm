const Tutor = require('../models/tutorModel')
const mongoose = require('mongoose')

// get all tutors
const getTutors = async (req, res) => {
    const { courses, rate } = req.query

    filter = {}

    if (courses) {
        filter.courses = courses;
    }

    if (Number(rate)) {
        filter.rate = { $lt: Number(rate) };
    }

    const tutors = await Tutor.find(filter).sort({createdAt: -1})

    res.status(200).json(tutors)
}

// get a single tutor
const getTutor = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such tutor'})
    }

    const tutor = await Tutor.findById(id) 

    if (!tutor) {
        return res.status(404).json({error: 'No such tutor'})
    }

    res.status(200).json(tutor)
}

// create new tutor
const createTutor = async (req, res) => {
    const { name, email, courses, rate, bio } = req.body

    try {
        const tutor = await Tutor.create({name, email, courses, rate, bio}) 
        res.status(200).json(tutor)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete tutor
const deleteTutor = async (req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such tutor'})
    }

    const tutor = await Tutor.findOneAndDelete({_id: id})

    if (!tutor) {
        return res.status(400).json({error: 'No such tutor'})
    }

    res.status(200).json(tutor)
}

// update tutor
const updateTutor = async (req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such tutor'})
    }

    const tutor = await Tutor.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!tutor) {
        return res.status(400).json({error: 'No such tutor'})
    }

    res.status(200).json(tutor)
}

module.exports = {
    getTutors,
    getTutor,
    createTutor,
    deleteTutor,
    updateTutor
}