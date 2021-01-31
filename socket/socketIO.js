// Dependencies
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// Import methods from users_methods
const { 
    addUser, 
    removeSocket, 
    onUserConnect,
    onUserMessage,
    onUserRequest
} = require('../utils/users_methods')


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
// let timeout

io.on('connection', socket =>
{

    // Add user to the list. If existed, update socket id
    socket.on('join',  ({id})=>
    {      
        
        // // Add user to container
            addUser(id[0], socket.id,(res) =>{
          
                if(res){
            // Then update user current active status to true
            onUserConnect(socket.id, (socketList)=>{
                // console.log(socketList)
                socketList.forEach(element => {
                    io.to(element).emit("userConnect")
                });
            })
            // Let the user know they has connect successfully
            socket.emit('reconnect', 'succeed')

                }
                else{
                    console.log('entry: ', id[1])
                    console.log(`Invalid id: ${id[0]}`)
                    if(id[1] < 10)
                        {
                            setTimeout(() => {
                            socket.emit('reconnect')
                            }, 1000);
                        }                         
                }
            })   
    })
  
    socket.on('message',  ({id,status}) =>{
        onUserMessage(id,socket.id, status, (socketList)=>{
      
            socketList.forEach(element => {
                io.to(element).emit("message", {id,status})
            });
        })
    })

    socket.on('request',  ({id, type}) =>{
        console.log(id , type)
        onUserRequest(id, socket.id, (socketList)=>{
     
            socketList.forEach(element => {
                io.to(element).emit("request")
            });
        })
    })


    // On disconnect
    socket.on('disconnect', () => {
        
        // Gett all users whose friends belong to the current user 
        onUserConnect(socket.id, (socketList)=>{
            // Then remove the socket from the list
            removeSocket(socket.id, (res) =>{console.log(res)})
            // Use the list of sockets we just got above
            // Emit for an update
            socketList.forEach(element => {
                console.log(element)
                io.to(element).emit("userConnect")
            });
        })

    })

})

// Handle user request
// const handleRequest = (id, type,socket) => {
 
//         switch (type) {
//             case 'load' : 
//             // On load request all the users whose friends' belong
//             // to the sender to re-fetch for updated data with read receipt.
//                     console.log('load')
//                     // Emit back to the sender to reload latest message
//                     // socket.emit('load')
//                      // Get all the group/friends' ids .
//                      getUsers(id, ({group}) =>{
                   
//                     // Map through the list of objects in group
//                     // and return new list with just the id.
//                     group = group.map(val => val.uuID)
                  
//                     // Get all users from Users class
//                     // and request the user with the 
//                     // available socket id to re-fetch.
//                     getAllUsers(group, (users) =>{
//                         users.forEach(user => {
//                             io.to(user.getSocketID()).emit("load")
//                         })})
//                     })
//                 break;
//             case 'userInfo':

//                 // Call update method to update all whose is friend with the
//                 // sender include the sender.
//                 update('userInfo',getUserSocket(socket).userID,true)
//                 break;
        
//             default:
//                 // Request the specific user with a provided id to 
//                 // re-fetch.
//                 io.to(getUserID(id).socketID).emit("update", type)

//                 // Request sender to re-fetch
//                 io.to(socket).emit("update", type)
                
//                 break;
//         }
// }

// getUsers(id, ({group}) =>{

//     // Map through the list of objects in group
//     // and return new list with just the id.
//     group = group.map(val => val.uuID)

//     // Get all users from Users class
//     // and request the user with the 
//     // available socket id to re-fetch.
//     getAllUsers(group, (users) =>{
//         users.forEach(user => {
//             io.to(user.getSocketID()).emit("load")
//         })})

// Update user status
// const update =  (type,id,status) => {
 
//     // UpdateStatus method from User model
//     // is use to update the current active status of the user.
//     updateStatus(id, status)
//     console.log('update' , id)
//     // Get all the users whose friends' belong to the requester
//     getFriend(id, ({friends}) =>{

//     // With the provided ids, call getAllUsers method from User
//     // class to get the infomation needed to send a request
  
//         getAllUsers([...friends, id], (users) =>{
//             users.forEach(user => {
//                 io.to(user.getSocketID()).emit("update", type)
//             })
//         })
//     })

// }

// // Rejoin method
let rejoin = (socket) => {
 
      // Emit all users except sender to rejoin
      socket.broadcast.emit('re-join')
   
    //   // Try request after half second
    //   setTimeout(() => {
    //       handleRequest(id,type,socket)
    //   }, 500);

    //   // Try request again after 3000 for 2 times
    //   let timeout = setInterval(() => {
    //       handleRequest(id,type,socket)
    //   }, 3000);
      
    //   // Clear interval after 2 tries
    //   setTimeout(() => {
    //       clearInterval(timeout)
    //   }, 6000);
}

// This should be in the server.js file instead
module.exports.io = io
module.exports.app = app
module.exports.server = server
module.exports.express = express