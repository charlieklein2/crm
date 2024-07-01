const express = require('express')
const {
    getTutors,
    getTutor,
    createTutor,
    deleteTutor,
    updateTutor
} = require('../controllers/tutorController')

const router = express.Router()

// GET / --> Gets all tutor documents
router.get('/', getTutors)

// GET /:id --> Gets a single tutor document
router.get('/:id', getTutor)

// POST / --> Creates a tutor documents
router.post('/', createTutor)

// DELETE /:id --> Deletes a single tutor document
router.delete('/:id', deleteTutor)

// PATHCH /:id --> Updates a single tutor document
router.patch('/:id', updateTutor)

module.exports = router