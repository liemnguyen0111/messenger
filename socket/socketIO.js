const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const options={
    cors:true
   }

const app = express()
const server = http.createServer(app)
const io = socketIO(server, options)

io.on('connection', socket =>
{
    // console.log('join')
    socket.on('join', (e)=>
    {
        console.log('helo', socket.id)
    })
})

module.exports.app = app
module.exports.server = server
module.exports.express = express