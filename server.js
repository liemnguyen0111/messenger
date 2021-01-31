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

// Import routes
app.use(require('./routes'))

// Serve any static files
app.use(express.static(join(__dirname, 'client/build')))

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendfile(join(__dirname, "client", "build", "index.html"))
})

// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(join(__dirname, 'client/build')));
      
//     // Handle React routing, return all requests to React app
//     app.get('*', function(req, res) {
//       res.sendFile(join(__dirname, 'client/build', 'index.html'));
//     });
// }

// Create PORTS
const PORT =  process.env.PORT || 5000

require('./connection')
.then(() => server.listen(PORT))
.catch( err => console.error(err))


