const { Group } = require('../models')
const jwt = require("jsonwebtoken");

module.exports  = {
    // Get group messages from provided id
    getMessage(params,groupId,userId,cb){
        switch (params) {
            case "get":
                console.log('get')
              getMessage(groupId,userId,cb)
                break;
            default:
                cb('invalid')
                break;
        }
    },

    createMessage(params,message, groupId, userId, cb){

        switch (params) {
            case "create":
              createMessage(message,groupId,userId,cb)
                break;
            default:
                cb('invalid')
                break;
        }
    }
}

// Get group messages from provided id
let getMessage = (groupId, userId,cb) =>{
    Group.findById({_id : groupId})
    .populate({ path : 'messages'})
    .then(data => filterMessage(data,userId))
    .catch(err => cb(err))
}

// Filter out message  
// and return only what needed to be appears on screen
let filterMessage = (messages, userId, cb) => {
    console.log("messages")
    cb(200)
}

// Create new message
let createMessage = (message, groupId, userId, cb) =>{
    message["uuID"] = `${userId}`
    message["isRead"] = false
    Group.findByIdAndUpdate(
        {_id : groupId},
        {$push : { messages : message }},
        (err) => {
            if(err) cb(err)
            cb(200)
        })
}