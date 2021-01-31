
const { updateStatus, getFriend } = require('../controllers/User')
const { getUsers, updateIsRead } = require('../controllers/Message')
// User class is used to create a new user everytime user enter chatbox and remove after
class UClass 
{
    constructor(){
        this.users = []
    }

    // This method will allow to get all the socket that belong to the user 
    // with the provided userId
    getUserWithId(userId){
        return this.users.filter(a => String(a.userId) === String(userId) ).map(b => b.socketId)
    }

    // This method will allow to get all the socket that belong to the user 
    // with the provided socketId
    getUserWithSocket(userSocketId){
        return  this.users.filter( a => a.userId === this.users.find(b=> b.socketId === userSocketId).userId).map(c => c.socketId )
    }

    // All user to the list with provided userId and socketId
    addUser(userId, socketId,cb){
        this.users.push({
            userId : userId,
            socketId : socketId
        })
    updateStatus(userId, true, 
    ()=>  cb(`userId: ${userId} and \nSocketId: ${socketId} successfully connected!`))

    }

    // Remove the disconnected socket from user
    removeSocket(socketId,cb){
        let userId = this.users.filter( user => user.socketId === socketId)
        this.users = this.users.filter(user => user.socketId !== socketId)
        if(userId[0])
        {
            let list = this.users.filter( user => user.userId === userId[0]["userId"])
            if(list.length < 1)
            {
                updateStatus(userId[0]["userId"], false, 
                ()=>  cb(`userId: ${userId[0]["userId"]} successfully disconnected!`))
            }
  
        }
       
    }

    // Get a list of socket whose friend' belong to the user
    getSocketList(socketId,cb){
        let userId = this.users.filter( user => user.socketId === socketId)[0]

        if(userId)
        {
            let usersSocket = this.getUserWithSocket(socketId)
     
            getFriend(userId["userId"], ({friends}) => {
            friends.map(val => usersSocket = [...usersSocket, ...this.getUserWithId(String(val))])
            cb([...usersSocket])
            })
        } 
    }
    // Get socket list of users whose belong to the provided groupId
    getSocketListFromGroup(groupId,socketId, status,cb){
        if(status === 200){
            let userId = this.users.filter( user => user.socketId === socketId)[0]
            if(userId)
            {
                console.log(userId)
                updateIsRead(groupId, userId["userId"])
            }
        }

        getUsers(groupId, ({group}) => {
            let socketList = []
            group.map( user => socketList = [...socketList, ...this.getUserWithId(user.uuID)])
            cb(socketList)
        })
    }

      // Get socket list of users whose belong to the provided groupId
      getSocketListFromUser(userId,socketId,cb){
        
        let user1 = this.getUserWithId(userId)
        let user2 = this.getUserWithSocket(socketId)
        cb([...user1, ...user2])
    }

    // Check if user already added in
    checkUser(userId){
        return 
    }
}

module.exports = UClass
