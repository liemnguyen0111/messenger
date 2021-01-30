const { Group } = require('../models')

module.exports  = {
    // Get group messages from provided id
    getMessage(params,groupId,userId,cb){
        switch (params) {
            case "get":
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
    Group.findById({_id : groupId}, {messages : true})
    .limit(200)
    .skip(1)
    .then(data=> console.log("res", data))

    Group.findById({_id : groupId})
    .populate('User')
    .then(({group, messages}) => {
        updateIsRead(groupId,userId)
        filterMessage(group,messages,userId,cb)
    })
    .catch(err => cb(err))
}

// Filter out message  
// and return only what needed to be appears on screen
let filterMessage = (group, messages, userId, cb) => {

     // Check if the message belong to the user
     let isUser = (val1, val2) => {
        return  JSON.stringify(val1) === JSON.stringify(val2)
    }

    // Date time format AM/PM
    let formatAMPM = (date) => {
        var hours = (date.getHours() + 7) % 24;
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }


    //  Check if the date created are on the same day
    let sameDate = (date1, date2) =>{
        return date1.getUTCFullYear() == date2.getUTCFullYear() &&
        date1.getUTCMonth() == date2.getUTCMonth() &&
        date1.getUTCDate() == date2.getUTCDate();
    }

    
    // If within the same day, return the time, otherwise return date and month
    let getTime = (date) => {
        sameDate(date, new Date())
         if(sameDate(new Date(date), new Date())){
             return (formatAMPM((date)))
         }
         else {
             if(isCurrentWeek(date))
             {
               return date.toUTCString().split(',')[0]
             }
             else
             {
               return month[date.getUTCMonth()] + " " + date.getUTCDate()
             }
         }
     }

      // Function to check if date is in the current week
    let isCurrentWeek = (date) => {
        const todayObj = new Date();
        const todayDate = todayObj.getDate();
        const todayDay = todayObj.getDay();
      
        // get first date of week
        const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
      
        // get last date of week
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
      
        // if date is equal or within the first and last dates of the week
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }
    
        // Get images from user whom sent the message
        let getImage = (group, messages) => {
            let temp = group.filter(val =>  isUser(val.uuID, messages.uuID))
            // console.log(temp)
           return temp.map(val => val.profileImage)
       }

    // Get all profile images that had read the message
    messages = messages.reduce((acc, val) => {
        acc.push({
            message : val.message,
            image : getImage(group, val),
            isYours : isUser(val.uuID, userId) ,
            time : getTime(new Date(val.time))
        })

    return acc
    },[])
 
    cb(messages)
}

// Create new message
let createMessage = (message, groupId, userId, cb) =>{
    message["uuID"] = `${userId}`
    message["isRead"] = [userId]
    message["type"] = "User"
    Group.findByIdAndUpdate(
        {_id : groupId},
        {$push : { messages : message}},
        (err) => {
            if(err) cb(err)
            cb(200)
        })
}

// Update all message isRead to true after user click on group
let updateIsRead = (groupId,userId) => {

    Group.findOne({ _id : groupId})
    .then( doc => {
      
        doc.messages.map(val => {
            if(!val.isRead.includes(userId))
            {
                val.isRead.push(userId) 
            }
        })
       
        doc.save()
    })
    .catch(err => console.error(err))
}

let getUsers = (groupId,cb) => {
    Group.findById({ _id : groupId}, {"group.uuID" : true}, (err,res) =>{
       cb(res)
    })
}

module.exports.getUsers = getUsers