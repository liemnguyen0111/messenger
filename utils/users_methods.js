
// User class
const User = require('./users')
// User container
let users = []

// Add new user if not exist and update socket id if exist
const addUser = (userID, socketID) =>
{
    if(!checkUser(userID))
    {

         users.push(new User(userID, socketID))
    }
    else
    {
        updateUserSocketID(getUserID(userID), socketID)
    }

}

// Check if user exist in users list
const checkUser = (userID) =>
{
    return users.find(user => user.getUserID() === userID)
}

// Update user socket id 
const updateUserSocketID = (User, socketID) =>
{
    User.setSocketID(socketID)
    return User
}

// Get user using user ID
const getUserID = (userID) =>
{
    return users.find(user => user.getUserID() === userID)
}

// Get user using user socket
const getUserSocket = (socketID) =>
{
    return users.find(user => user.getSocketID() === socketID)
}

// Get all user socket with given userID
const getAllUsers = (usersID,cb) =>
{
   cb(users.filter( user => usersID.includes(user.getUserID())))
}

// Get all users from users container
const getAll = () => {
    return users[0]
}

// Export functions out for other to use
module.exports.addUser = addUser
module.exports.checkUser = checkUser
module.exports.updateUserSocketID = updateUserSocketID
module.exports.getUserID = getUserID
module.exports.getUserSocket = getUserSocket
module.exports.getAllUsers = getAllUsers
module.exports.getAll = getAll
