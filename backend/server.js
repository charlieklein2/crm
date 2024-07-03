require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const tutorRoutes = require('./routes/tutors')
const userRoutes = require('./routes/user')
const User = require('./models/userModel')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/tutors', tutorRoutes)

app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & istening on port 4000!')
        })
    })
    .catch((error) => {
        console.log(error)
    })
