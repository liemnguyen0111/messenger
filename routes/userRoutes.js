const router = require('express').Router()
const passport = require('passport')
const jwt = require("jsonwebtoken");
const User = require('../controllers/User')
const ipInfo = require("ipinfo")

// Get users info base on request
router.get('/user/:request', passport.authenticate("jwt"), (req, res) =>{


    let queries = req.query
    switch (req.params.request) {
        case "init":
            User.userInit( req.user ,(data) => {
                res.json(data)
             })
            break;
        case "users" :
            User.getUsers(queries["view"],queries["page"],queries["limit"],queries["value"], req.user, (...data) =>{
                res.json(data)
            })
            break;
        case 'authenticate' :
            authenticate((auth) => {
                res.json(auth)
            })
            break;
        default:
            break;
    }
})

// Register route
router.post('/register/user', (req, res) =>
{   
  
    User.addUser(req.body, (data) => {
        res.json(data)
    })
})

// Login route
router.put('/user/:request', passport.authenticate("jwt"), (req, res ) =>
{
 console.log(req.query)
//  res.json(200)
 switch (req.params.request) {
     case "login":
         // Use user ip to keep a record of where the account has logged.
        ipInfo(req.body["ivp6"],(err, cLoc) => {
         // login user
         User.loginUser(req.body, cLoc , (data) => {
         res.json(data)
         })
         })
         break;
      case 'update':     
            User.updateUser(req.query["type"], req.user, req.body, (data) =>
            {
                res.json(200)
            })
     default:
         break;
 }

    
})

// Currently not in use
router.delete('user/:id', (req,res) =>{
    res.json(200)
})

// Authenticate with callback
const authenticate = (passport.authenticate("jwt"), (cb) => {
    console.log('e')
    cb(passport.authenticate("jwt"))
}) 




// // Authorize route
// router.get('/authorize/user', passport.authenticate("jwt"), (req,res) =>
// {
//     res.sendStatus(200)
// })

// // Initialize route
// router.get('/init/user', passport.authenticate("jwt"), (req,res) =>
// {
  
// })

// // Update user info, only allow if logged in
// router.put('/user/:type', passport.authenticate("jwt") ,(req, res) =>
// {
//     User.updateUser(req.params.type, req.user, req.body, (data) =>
//     {
//         res.json(data)
//     })
// })


// Request route for password change
// router.put('/request/password', (req, res) => 
// {
//     User.checkUser(req.body, (data) => res.json(data))
// })


// Change user password - (incompleted)
// router.put('/update/password/user/:ticket', (req, res) =>
// {

//     test.push(req.params.ticket)
//     setTimeout(() => {
//         test = test.filter(t => t !== req.params.ticket)
 
//     }, 10000);
//     res.sendStatus(200)

// })



module.exports = router