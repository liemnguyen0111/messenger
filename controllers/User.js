const { User } = require('../models')
const jwt = require("jsonwebtoken");

module.exports  = {

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
                    if(e) cb(err)
                    else { cb(user ? jwt.sign({ id : user._id }, process.env.SECRET) : null) }
                }
            )                          
        }
        })
    },

    // Login
    loginUser(data, cb) {
        User.authenticate()(
            data["username"],
            data["password"],
            (err, user) => {
                if(err) { cb(err) }
                else { cb(user ? jwt.sign({ id : user._id }, process.env.SECRET) : null) }
            }
        )
    },

    // Update user info
    updateUser(userID, newData, cb) {
        User.findByIdAndUpdate(userID, { $set : newData}, { new : true }, (err ,res) => cb(res))
    },

    // Update user password
    updateUserPassword(email,cb){
        // console.log(email)
        // let temp = email["email"]
        User.findOne(email, (err, user) =>
        {
            console.log(user)
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