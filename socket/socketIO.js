// Dependencies
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// Import methods from users_methods
const { addUser, getAllUsers , getUserSocket, getUserID, getAll} = require('../utils/users_methods')
// Import methods from Users model
const  { updateStatus, getFriend }  = require('../controllers/User')
// Import methods from Messages model 
const  { getUsers }  = require('../controllers/Message')

// Cors was enabled by default on socket.io version 2.3.0 and below
// With newer version ^2.4.0, we now have to explicitly enable it
const options={
    cors:true
   }

// Middlewares
const app = express()
const server = http.createServer(app)
const io = socketIO(server, options)

// Reserve for later use if
// user not exited in User class
let timeout

io.on('connection', socket =>
{

    // Add user to the list. If existed, update socket id
    socket.on('join', ({id})=>
    {
        // Add user to the list
        addUser(id, socket.id)
        // Then update user current active status to true
        update('userConnect',id, true)
    })
  
    // Listen to on re-join request
    socket.on('re-join', (id) => {

        // Add user to the list
         addUser(id, socket.id)
        // Then update user current active status to false
         update('userConnect',id, true)
    })
 
    // On friend request
    socket.on('request',  async ({id, type}) =>{

        // If not user, request all users to rejoin
        if(!getAll()){
            
            //  Emit current user to rejoin
             socket.emit('re-join')
            // Emit all users except sender to rejoin
             socket.broadcast.emit('re-join')
            
            // Try request after half second
            setTimeout(() => {
                handleRequest(id,type,socket)
            }, 500);

            // Try request again after 3000 for 2 times
            timeout = setInterval(() => {
                handleRequest(id,type,socket)
            }, 3000);
            
            // Clear interval after 2 tries
            setTimeout(() => {
                clearInterval(timeout)
            }, 6000);
        }
        else {

            // Handle request if user exist in User container
            handleRequest(id,type,socket)
        }
       
    })

    // On disconnect
    socket.on('disconnect', () => {
        if(getUserSocket(socket.id))
       {
           // Update user status
         update('userDisconnect',getUserSocket(socket.id).userID, false)
        }

    })

})

// Handle user request
const handleRequest = (id, type,socket) => {
    try 
        {
        switch (type) {
            case 'load' : 
            // On load request all the users whose friends' belong
            // to the sender to re-fetch for updated data.

            // Get all the group/friends' ids .
            getUsers(id, ({group}) =>{

                // Map through the list of objects in group
                // and return new list with just the id.
                group = group.map(val => val.uuID)

                // Get all users from Users class
                // and request the user with the 
                // available socket id to re-fetch.
                getAllUsers(group, (users) =>{
                    users.forEach(user => {
                        io.to(user.getSocketID()).emit("load")
                    })})
            })
                break;
            case 'message':

                // Get all the group/friends' ids .
                getUsers(id, ({group}) =>{

                    // Map through the list of objects in group
                   // and return new list with just the id.
                    group = group.map(val => val.uuID)

                    
                    // Get all users from Users class
                    // and request the user with the 
                    // available socket id to re-fetch.
                    getAllUsers(group, (users) =>{
                        users.forEach(user => {
                            io.to(user.getSocketID()).emit("message")
                        })})
                })
                break;
            case 'userInfo':
                // Request the sender to re-fetch
                io.to(getUserSocket(socket.id).socketID).emit("update", type)
                // Call update method to update all whose is friend with the
                // sender.
                update('userInfo',getUserSocket(socket.id).userID,true)
                break;
        
            default:
                // Request the specific user with a provided id to 
                // re-fetch.
                io.to(getUserID(id).socketID).emit("update", type)
                // Request sender to re-fetch
                io.to(socket.id).emit("update", type)
                break;
        }}
        catch { (err ) => console.log('error')}
}

// Update user status
const update = (type,id,status) => {
    try {
    // UpdateStatus method from User model
    // is use to update the current active status of the user.
    updateStatus(id, status)

    // Get all the users whose friends' belong to the requester
    getFriend(id, ({friends}) =>{
        // With the provided ids, call getAllUsers method from User
        // class to get the infomation needed to send a request
        getAllUsers(friends, (users) =>{
            users.forEach(user => {
                io.to(user.getSocketID()).emit("update", type)
            })
        })
    })
    } catch { err => console.error(err) }
  
}


// This should be in the server.js file instead
module.exports.io = io
module.exports.app = app
module.exports.server = server
module.exports.express = express