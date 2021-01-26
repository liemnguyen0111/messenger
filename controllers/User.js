const { User } = require('../models')
const jwt = require("jsonwebtoken");

module.exports  = {

    userInit(user, cb){
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
                User.find({ _id : {$ne : user._id }}, option, (err,res) =>{
                    if(err) cb(err)
                    cb(filterFriends(res, user.request, user.pending))
                })
                break;
            case 'pending' :
                User.findById( user.pending , option, (err,res) =>{
                    if(err) cb(err)
                    cb(filterFriends(res, user.request, user.pending))
                })
                    break;
            case 'request' :
                User.findById( user.request , option, (err,res) =>{
                    if(err) cb(err)
                    cb(filterFriends(res, user.request, user.pending))
                })
                break;
            default:
                User.find({ _id : {$ne : user._id }}, option, (err,res) =>{
                    if(err) cb(err)
                    cb(filterFriends(res, user.request, user.pending))
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
    updateUser(userID, newData, cb) {
        User.findByIdAndUpdate(userID, 
        { $set : newData , updatedOn: new Date(Date.now()) }, 
        { new : true }, 
        (err ,res) => cb(res))
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

let filterFriends = (list1, request, pending) =>{
    
    if(!list1) return []
    list1 = list1.reduce((acc , data)=>{
     
        if(!request.includes(data._id) && !pending.includes(data._id)){
            // const obj = {...val, status : 'none'}
            acc.push({data , status : 'Add Friend'})
        }
        if(request.includes(data._id)){  
            // const obj = {...val, status : 'request'}
            acc.push({data , status : 'Accept'})
        }
        if(pending.includes(data._id)){  
            // const obj = {...val, status : 'pending'}
            acc.push({data , status : 'Pending'})
        }
        
        return acc
    },[])

    return list1
}