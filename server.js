// Dependencies
require('dotenv').config()
const { join } = require('path')

const app = require('./socket/socketIO').app
const server = require('./socket/socketIO').server
const express = require('./socket/socketIO').express
const passport = require('./passport/passport').passport

// Middlewares
app.use(express.urlencoded({ extended : true }))
app.use(express.json())

// User authenticate using passport
app.use(passport.initialize())
app.use(passport.session())

// Serve any static files
app.use(express.static(join(__dirname, 'client/build')))

// Import routes
app.use(require('./routes'))

// Handle React routing, return all requests to React app
app.get('*', (req, res) =>
{
    app.sendFile(join(__dirname, 'client/public', 'index.html'))
})

// Create PORTS
const PORT =  process.env.PORT || 5000

require('./connection')
.then(() => server.listen(PORT))
.catch( err => console.error(err))


