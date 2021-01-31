const { User , Group, Count } = require('../models')
const jwt = require("jsonwebtoken");
// let users = require('../db/MOCK_DATA.json')

// users = users.reduce((acc, val) => {
//     let temp = {
//       data : val,
//       password : "123"
//     }
//     acc.push(temp)
//     return acc
//   }, [])
  
//   console.log(users)
//   users.map(val => {
//     User.register(new User(val["data"]), val["password"], (err,res) => 
//     {
//         console.log(res)
//         // if(err) {cb(err)}
//         // else
//         // { User.authenticate()(
//         //   val["data"].username,
//         //   val["password"],
//         //     (err, user) => {
//         //         // if(err) cb(err)
//         //         // else { cb(user ? jwt.sign({ id : user._id }, process.env.SECRET) : null) }
//         //     }
//         // )                          
//     // }
//     })
//   })

  
module.exports  = {

    // Initialize user data when first logged in
    userInit(user, cb){
      
        try{
            User.findById({_id : user._id})
            .populate({
                path : 'group',
                populate : {
                    path: 'group.uuID',
                    model : 'User',
                    select : 'isActive'
                }
            })
            .then(data => {filterUser(data,user._id,cb)})
            .catch(err => cb(err))
        } catch { err => cb(404)}
    
    },

    // Get all users base on request
    getUsers(params,page,limit,value, user, cb){
      
        // Option to only getting the fields that are set to true
        let option = {
            _id : true,
            firstName : true,
            lastName : true,
            image : true
        }
        console.log(params,page,limit,value)
        try {
        switch(params){
            case 'all' :
                User.find({ _id : {$ne : user._id }},option, 
                    {limit : parseInt(limit), skip : (page * 10) }, (err,res) =>{
                    if(err) cb(err)
                    filterFriends(res,user.friends, user.request, user.pending,cb)
                })
                break;
            case 'pending' :
                User.find({ _id : user.pending} , option,
                    {limit : parseInt(limit), skip : (page * 10)}, (err,res) =>{
                    if(err) cb(err)
                   filterFriends(res,user.friends, user.request, user.pending,cb)
                })
                    break;
            case 'request' :
                User.find( { _id : user.request} , option, 
                    {limit : parseInt(limit), skip : (page * 10)},
                    (err,res) =>{
                    if(err) cb(err)
                    filterFriends(res,user.friends, user.request, user.pending,cb)
                })
                break;
            default:

                User.find({ 
                   $and : [
                    {$or: [
                        { firstName: { $in: value.split(' ') } },
                        { firstName: { $regex: value, $options : "i" } },
                        { lastName: { $in: value.split(' ') } },
                        { lastName: { $regex: value, $options : "i" } }
                    ]},
                    {
                       _id : { $ne : user._id}
                    }
                   ]
                }, option, {limit : 10, skip : page * 10 }, (err,res) =>{
                    if(err) cb(err)
                    filterFriends(res,user.friends, user.request, user.pending,cb)
                })
        }} catch { err => cb(404)}
    },

    // Add new user 
    addUser(data, cb) {
        // Create new user
        User.register(new User(data["data"]), data["password"], (err) => 
        {
            // Callback if error, otherwise authenticate user with 
            // a json web token
            if(err) {cb(err)}
            else
            { User.authenticate()(
                data["data"].username,
                data["password"],
                (err, user) => {
                    if(err) cb(err)
                    else { cb(user ? jwt.sign({ id : user._id }, process.env.SECRET) : null) }
                }
            )                          
        }
        })
    },

    // Login
    loginUser(data, cloc, cb) {
        // Authenticate user
        User.authenticate()(
            data["username"],
            data["password"],
            (err, user) => {
                // Callback if error, otherwise find and update
                if(err) { cb(err) }
                else { 
                    // Set log in record after user signin
                    User.findByIdAndUpdate(user._id, 
                         { $push : {
                             loggedInRecord :{
                                 from : cloc
                             }
                         }})
                        .then(() => {})
                        .catch(() => {})

                    // callback function, return back user token
                    cb(user ? jwt.sign({ id : user._id }, process.env.SECRET) : null) 
                }
            }
        )
    },

    // Update user info on request
    updateUser(type,user, data, cb) {
  
        switch(type){
            case 'send-request' : 
            request(user._id, data.id, false, cb)
            break;
            case 'accept-request' :
            accept(user, data, false, cb)
            break;
            case 'reject-request':
            remove(user._id, data.id, false, cb)
            break;
            case 'unfriend' : 
            unfriend(user._id, data.id, false, cb)
            break;
            case 'update-info' : 
            update(user._id, data, cb)
            break;
            default :
            cb('invalid entry')
        }
    },

    // Update user password
    updateUserPassword(email,cb){
        User.findOne(email, (err, user) =>
        {
            
        })
    },

    // Use to check if user existed with the provided email
    // If not, send an verification email with link
    // to activate an account
    checkUser(email,cb) {
        User.findOne(email, (err, user) => {
            if(user)
            {
               let a = randomString(email,user.username, user._id)
               cb({a, session})
            }
            else
            {
                cb(404)
            }
        })
    }
}

// Use to hold all new register user 
// Will be remove once the account activated
let session = []

// Create random string base on the data provided
let randomString = (email,data, key) =>
{
    data += key + Date.now()
    data = String(data).split('')
    let wave = data.reduce((acc, val, index) => {
        let random = Math.ceil(Math.random(val) * 100) 
        String.fromCharCode(random).match((/^[a-zA-Z0-9]+$/)) ? acc.push(String.fromCharCode(random)) : acc.push(random)
        return acc
    }, []).join('')
    wave = { email : email.email , wave : wave}
    let index =  session.findIndex(x => x["wave"] === wave["wave"])
    index === -1 ? session.push(wave) : ''
    
    setTimeout(() => {
        session = session.filter( w => w["wave"] !== wave["wave"])
    }, 100000 );
    return wave
}

// Filter user info and return only what needs to initialize when user login
let filterUser = (data,userId, cb) =>{

    let temp = data.group
    // Return only the selected fields
    data =  {
        id : data._id,
        username : data.username,
        firstName : data.firstName,
        lastName : data.lastName,
        address : data.address,
        createdOn : data.createdOn,
        updatedOn : data.updatedOn,
        email : data.email,
        image : data.image,
        group : filterGroup(temp,userId),
        pendingCount : data.pendingCount,
        requestCount : data.requestCount
    }

    cb(data)
}

// Filter group and return the right data
let filterGroup = (data,userId) => {

    // month variable holds the months
    let month = ["Jan.", "Feb.","Mar.", 'Apr.', "May", "June", "July", "Aug.", "Sept.","Oct.", "Nov.", "Dec."]

    // Get the other user name as the name of the group
    let getGroupName = (group) => {

       return group.filter(val => 
           JSON.stringify(val.uuID._id) !== JSON.stringify(userId))
    }

    // Check if the latest message belong to the user
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
   
    // Get active status
    let getActive = (group, id) => {
     return group.filter((val) => !isUser( val.uuID._id, id) && val.uuID["isActive"])[0] ? 1 : 0
    }

    // Return true if id found in list of isRead
    let isRead = (list) =>{
        return list.includes(userId)
    }

    // Get sender name
    let getSenderName = (group, lastMessage) => {
        let user = group.filter((val) => !isUser( val.uuID._id, lastMessage.uuID))[0]
        return user.firstName + ": "
    }

    // Get images from user who has read
    let getImages = (group, messages) => {
         let temp = group.filter(val =>  
        messages.isRead.includes(val.uuID._id) &&
         !isUser( val.uuID._id, userId) &&
         isUser( userId, messages.uuID) 
         )
        return temp.map(val => val.profileImage)
    }
    // create a new set of date for group
    data = data.reduce((acc, val) => {
        let user = getGroupName(val.group)[0],
        latestMessage = val.latestMessage,
        groupLength = val.group.length
        from = isUser(latestMessage.uuID, userId) ? "You: " : 
        (groupLength > 2) ? getSenderName(val.group,latestMessage) : ""

        acc.push({
            id : val._id,
            groupName : user.firstName + " " + user.lastName,
            profileImage : user.profileImage,
            latestMessage : from + latestMessage.message,
            readImages : getImages(val.group, latestMessage),
            isRead : isRead(latestMessage.isRead),
            isYours : isUser(latestMessage.uuID, userId) ,
            isActive :  getActive(val.group, userId),
            time : getTime(new Date(latestMessage.time))
        })

        return acc
    },[])

    return data
}

// use to create a new list with current user status 
let filterFriends = (list1,friends, request, pending,cb) =>{

    try {
        list1 = list1.reduce((acc , data)=>{
            if(!request.includes(data._id) 
            && !pending.includes(data._id) 
            && !friends.includes(data._id)
            ){
                acc.push({data , status : 'Add Friend'})
            }
            if(request.includes(data._id)){  
        
                acc.push({data , status : 'Accept'})
            }
            if(pending.includes(data._id)){  
                acc.push({data , status : 'Pending'})
            }
            if(friends.includes(data._id)){  
                acc.push({data , status : 'Unfriend'})
            }
            
            return acc
        },[])
        User.countDocuments({}, (err, res ) => 
        cb(list1, {
            all : res, 
            pending: pending.length, 
            request : request.length})
        )
    } catch (error) {
        filterFriends([list1], request, pending,cb)
    }

}

// Unfriend
let unfriend = (id1 , id2, status,cb) => {

    //  Find the group that belong to the users
      Group.find({
        $and : [{ "group.uuID" : id1},
                { "group.uuID" : id2}]
        }, (err, res) =>{

            // Find the user and remove the group id
            User.findByIdAndUpdate(  
                id1, 
                {
                 $pull : { friends : id2 , group : res[0]._id},
                },  (err, res) =>{
                    if(err) cb(err)
                    if(!status) unfriend(id2, id1, true,cb)
                    if(status) cb(200)
                })   
        })
}


// Friend request
let request = (id1 , id2, status,cb) => {
  
    // Update current status of two users 
    User.findByIdAndUpdate(  
        id1, 
        {
         $addToSet : { [!status? "pending" : "request"] : id2 }
        }, (err, res) =>{
            if(err)  cb(err)
            if(!status) request(id2, id1, true,cb)
            if(status) cb(200)
        })  
}

// Friend accept
let accept = (id1 , id2, status,cb) => {
  
    // Create new group, remove the pending status
    // then add the two users to friends list
    createGroup(id1,id2, (groupId) => {
    remove(id1._id,id2.id,false)
    add(id1._id,id2.id,false,groupId,cb)
    })
}

// Create group 
let createGroup = (user1, user2,cb) => {

    let users = [
        {
        uuID : user1._id,
        firstName : user1.firstName,
        lastName : user1.lastName,
        profileImage : user1.image
        },
        {
        uuID : user2.id,
        firstName : user2.firstName,
        lastName : user2.lastName,
        profileImage : user2.image
        }
    ]

    // Find if group already created for two users
    Group.find({
        $and : [{ "group.uuID" : user1._id},
                { "group.uuID" : user2.id}]
    }).then((data) => {
        // return id if existed
        if(data[0])
            {
               cb(data[0]._id)
            }
        // else create new group and return new id
        else{
        Group.create({
        group : users,
        messages : [{
            type : "bot",
            message : 'Welcome User',
            isRead: []
        }]
         }, (err, res) => 
         {
        if(err) console.error(err)
            cb(res._id)
         })
        }
    })

}

// remove user from pending/request list 
let remove = (id1,id2, status,cb) => {
    // console.log(id1, id2)
    User.findByIdAndUpdate(  
        id1, 
        {
         $pull : { [!status? "request" : "pending"] : id2 },
        },  (err, res) =>{
            if(err) cb(err)
            if(!status) remove(id2, id1, true,cb)
            if(cb)
            if(status) cb(200)
        })  
}

// Add user id into friend list
let add = (id1, id2, status, groupId,cb) =>{
  
    User.findByIdAndUpdate(  
        id1, 
        {
         $addToSet : { friends : id2, group : groupId}
        },  (err, res) =>{
            if(err)  cb(err)
            if(!status)  add(id2, id1, true, groupId,cb)
            if(cb)
            if(status) cb(200)
        })  

}

// Update user info
let update = (id, data, cb) =>{
    User.findByIdAndUpdate(id, 
    { $set : data , updatedOn: new Date(Date.now()) }, 
    { new : true }, 
    (err ,res) => { 
        if ( err ) cb(err)
        updateGroup(id,data)
        cb(res)
    })
}

// Update group after user update their info
let updateGroup = (id, data) => {
    Group.findOne({ "group.uuID" : id})
    .then( doc => {
        doc.group.map(val => {
 
            if(JSON.stringify(val.uuID) === JSON.stringify(id))
            {
                val["firstName"] = data["firstName"]
                val["lastName"] = data["lastName"]
            }
        })
       
        doc.save()
    })
    .catch(err => console.error(err))
}

// Update user status
let updateStatus = (id,status,cb) => {
    User.findByIdAndUpdate(id, 
        { $set : { isActive : status }},
        { new : true },
        (err,res) => { 
            if(err) cb(err) 
            else cb(res)
        }
        )
}

// Get friends id
let getFriend = (id, cb) =>{
  
     User.findById(id, {friends : true}, (err,res)=>{
        if(err) cb(err)
        else cb(res)
    })
}

// Export for others to use
// - (SocketIO.js)
module.exports.updateStatus = updateStatus
module.exports.getFriend = getFriend