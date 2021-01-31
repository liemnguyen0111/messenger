
// User class
const { getUsers } = require('../controllers/Message')
const User = require('../models/User')
const UClass = require('./users')

// User container
let container = new UClass

const users = {

    // Add user with provided userId and socketId to container
    addUser : (userId, socketId,cb) => 
            User.findById(userId,{ _id : true}, (err, res)=>{
            if(err) cb(0)
            else{container.addUser(userId, socketId,cb)}
        }),
    removeSocket : (socketId,cb) => 
            container.removeSocket(socketId,cb),
    onUserConnect : (socketId,cb) => 
            container.getSocketList(socketId,cb),   
    onUserMessage : (groupId,socketId, status,cb) => 
            container.getSocketListFromGroup(groupId,socketId,status,cb),
     onUserRequest : (userId,socketId,cb) => 
            container.getSocketListFromUser(userId,socketId,cb)
    
    
}

module.exports = users



// // Remove user with provided socket id
// const removeUser = (socketID) => {
//     users = users.filter( user => user.getSocketID !== socketID)
// }

// // Check if user exist in users list
// const checkUser = (userID) =>
// {
//     return users.find(user => user.getUserID() === userID)
// }

// // Update user socket id 
// const updateUserSocketID = (User, socketID) =>
// {
//     User.setSocketID(socketID)
//     return User
// }

// // Get user using user ID
// const getUserID = (userID) =>
// {   
//     return users.find(user => user.getUserID() === userID)
// }

// // Get user using user socket
// const getUserSocket = (socketID) =>
// {
//     return users.find(user => user.getSocketID() === socketID)
// }

// // Get all user socket with given userID
// const getAllUsers = (usersID,cb) =>
// {
//     usersID = usersID.map(user => String(user))
//    cb(users.filter( user => usersID.includes(user.getUserID())))
// }

// // Get all users from users container
// const getAll = () => {
//     return users
// }


// // Export functions out for other to use
// module.exports.addUser = addUser
// module.exports.checkUser = checkUser
// module.exports.updateUserSocketID = updateUserSocketID
// module.exports.getUserID = getUserID
// module.exports.getUserSocket = getUserSocket
// module.exports.getAllUsers = getAllUsers
// module.exports.getAll = getAll
// module.exports.removeUser = removeUser
