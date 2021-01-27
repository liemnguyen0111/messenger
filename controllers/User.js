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

    userInit(user, cb){
        let option = {
            _id : true,
            firstName : true,
            lastName : true,
            image : true,
            email : true,
            address: true,
            createdOn : true,
            updatedOn : true
        }
        // console.log(user)
        cb(user)
    },
    // Get all users base on request
    getUsers(params, user, cb){
      
        let option = {
            _id : true,
            firstName : true,
            lastName : true,
            image : true
        }

        switch(params){
            case 'all' :
                User.find({ _id : {$ne : user._id }},option, (err,res) =>{
                    if(err) cb(err)
                    filterFriends(res,user.friends, user.request, user.pending,cb)
                })
                break;
            case 'pending' :
                User.find({ _id : user.pending} , option, (err,res) =>{
                    if(err) cb(err)
                   filterFriends(res,user.friends, user.request, user.pending,cb)
                })
                    break;
            case 'request' :
                User.find( { _id : user.request} , option, (err,res) =>{
                    if(err) cb(err)
                    filterFriends(res,user.friends, user.request, user.pending,cb)
                })
                break;
            default:
                User.find({ 
                    $or: [
                        { firstName: { $regex: params, $options:  'i' } },
                        { lastName: { $regex: params, $options:  'i' } }
                      ]
                }, option, (err,res) =>{
                    if(err) cb(err)
                    filterFriends(res,user.friends, user.request, user.pending,cb)
                })
        }
    },
    // Add new user 
    addUser(data, cb) {
        User.register(new User(data["data"]), data["password"], (err) => 
        {
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
        // console.log(cloc)
        User.authenticate()(
            data["username"],
            data["password"],
            (err, user) => {
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

    // Update user info
    updateUser(type,user, data, cb) {
       console.log(type)
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
        // console.log(email)
        // let temp = email["email"]
        User.findOne(email, (err, user) =>
        {
            // console.log(user)
        })
    },
    checkUser(email,cb) {
        User.findOne(email, (err, user) => {
            if(user)
            {
                // cb(user)
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

let session = []

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

// use to create a new list with status 
let filterFriends = (list1,friends, request, pending,cb) =>{
    
    // if(typeof list1 === 'object')  cb([list1])

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
                // console.log(data)
            }
            if(pending.includes(data._id)){  
                acc.push({data , status : 'Pending'})
            }
            if(friends.includes(data._id)){  
                acc.push({data , status : 'Unfriend'})
            }
            
            return acc
        },[])
        User.count({}, (err, res ) => 
        cb(list1, {userCount : res, 
            pendingCount: pending.length, 
            requestCount : request.length})
        )
    } catch (error) {
        filterFriends([list1], request, pending,cb)
    }

}

// Unfriend
let unfriend = (id1 , id2, status,cb) => {

    //   Find group id and remove them from both user
      Group.find({
        $and : [{ "group.uuID" : id1},
                { "group.uuID" : id2}]
        }, (err, res) =>{
            User.findByIdAndUpdate(  
                id1, 
                {
                 $pull : { friends : id2 , group : res[0]._id},
                },  (err, res) =>{
                    if(err) cb(err)
                    if(!status) unfriend(id2, id1, true,cb)
                })   
        })
}


// Friend request
let request = (id1 , id2, status,cb) => {
  
    User.findByIdAndUpdate(  
        id1, 
        {
         $addToSet : { [!status? "pending" : "request"] : id2 }
        }, (err, res) =>{
            if(err)  cb(err)
            if(status)  cb(200) 
            if(!status) request(id2, id1, true,cb)
        })  
}

// Friend accept
let accept = async (id1 , id2, status,cb) => {
  
    let group = createGroup(id1,id2, (groupId) => {
    remove(id1._id,id2.id,false,cb)
    add(id1._id,id2.id,false,groupId,cb)
    })
    cb(200)
}

let add = (id1, id2, status, groupId,cb) =>{
    User.findByIdAndUpdate(  
        id1, 
        {
         $addToSet : { friends : id2, group : groupId}
        },  (err, res) =>{
            if(err)  cb(err)
            if(!status)  add(id2, id1, true, groupId,cb)
        })  

}

let createGroup = (user1, user2,cb) => {

    let users = [
        {
        uuID : user1._id,
        nickName : `${user1.firstName} ${user1.lastName}`,
        profileImage : user1.image
        },
        {
        uuID : user2.id,
        nickName : user2.name,
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
        message : []
         }, (err, res) => 
         {
        if(err) console.error(err)
            cb(res._id)
         })
        }
    })

}

// Get group id
let getGroupId = (id1, id2) => {

}
// remove user from pending/request list 
let remove = (id1,id2, status,cb) => {
    User.findByIdAndUpdate(  
        id1, 
        {
         $pull : { [!status? "request" : "pending"] : id2 },
        },  (err, res) =>{
            if(err) cb(err)
            if(!status) remove(id2, id1, true)
        })  
}

// Update user info
let update = (id, data, cb) =>{
    User.findByIdAndUpdate(id, 
    { $set : data , updatedOn: new Date(Date.now()) }, 
    { new : true }, 
    (err ,res) => { 
        if ( err ) cb(err)
        cb(res)
    })
}