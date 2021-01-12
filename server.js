// Dependencies
require('dotenv').config()
const express = require('express')
const app = express()
const { join } = require('path')

// Middlewares
// if (process.env.NODE_ENV === 'production') {

    // Serve any static files
   app.use(express.static(join(__dirname, 'client/build')))

   // Handle React routing, return all requests to React app
   app.get('*', (req, res) =>
   {
    // res.send(`API is working properly`);
   res.sendFile(join(__dirname, 'client/public', 'index.html'))
   })

// }

app.use(express.urlencoded({ extended : true }))
app.use(express.json())

// Import routes
app.use(require('./routes'))





// Create PORTS
const PORT = process.env.PORT || 5000

require('./config')
.then(() => app.listen(PORT))
.catch( err => console.error(err))