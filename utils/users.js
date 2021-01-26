// User class is used to create a new user everytime user enter chatbox and remove after
class User 
{
    constructor(userID, socketID){
        this.userID = userID;
        this.socketID = socketID;
    }

    getUserID(){ return this.userID }
    getSocketID(){ return this.socketID }
    setSocketID(socketID) 
    {
        this.socketID = socketID
    }
}

module.exports = User