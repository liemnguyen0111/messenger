const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const { addUser, getAllUsers , getUserSocket, getUserID} = require('../utils/users_methods')
const  { updateStatus, getFriend, getUsers }  = require('../controllers/User')

const options={
    cors:true
   }

const app = express()
const server = http.createServer(app)
const io = socketIO(server, options)

io.on('connection', socket =>
{

    // Add user to the list. If existed, update socket id
    socket.on('join', ({id})=>
    {
        console.log('join')
        addUser(id, socket.id)
        update('userConnect',id, true)
    })
  
    // On friend request
    socket.on('request', ({id, type}) =>{

        if(getUserSocket(socket.id))
        {
        if(type === 'userInfo')
        {
            console.log('uerinfo')
            update('userInfo',getUserSocket(socket.id).userID,true)
        }else
        {
            io.to(getUserID(id).socketID).emit("update", type)
            io.to(getUserSocket(socket.id).socketID).emit("update", type)
        }
  
        }
    })

    // On disconnect
    socket.on('disconnect', () => {
        if(getUserSocket(socket.id))
       {
        update('userDisconnect',getUserSocket(socket.id).userID, false)
         }

    })

})

// Update user status
const update = (type,id,status) => {
    updateStatus(id, status)
    getFriend(id, ({friends}) =>{
        getAllUsers(friends, (users) =>{
            users.forEach(user => {
                io.to(user.getSocketID()).emit("update", type)
            })
        })
    })
}

module.exports.io = io
module.exports.app = app
module.exports.server = server
module.exports.express = express