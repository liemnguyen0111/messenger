const router = require('express').Router()
const passport = require('passport')
const jwt = require("jsonwebtoken");
const User = require('../controllers/User')
const io = require('../socket/socketIO').io
const ipInfo = require("ipinfo")

// Get users
router.get('/user/:type', passport.authenticate("jwt"), (req, res) =>{
    User.getUsers(req.params.type, req.user, (...data) =>{
        res.json(data)
    })
})

// Login route
router.post('/login/user', async (req, res ) =>
{
 
// Use user ip to keep a record of where the account has logged.
ipInfo(req.body["ivp6"],(err, cLoc) => {

    // login user
    User.loginUser(req.body, cLoc , (data) => {
        
        res.json(data)
    })
})
    
})

// Register route
router.post('/register/user', (req, res) =>
{   
  
    User.addUser(req.body, (data) => {
        res.json(data)
    })
})

// Authorize route
router.get('/authorize/user', passport.authenticate("jwt"), (req,res) =>
{
    res.sendStatus(200)
})

// Initialize route
router.get('/init/user', passport.authenticate("jwt"), (req,res) =>
{
    User.userInit( req.user ,(data) => {
       res.json(data)
    })
})

// Update user info, only allow if logged in
router.put('/user/:type', passport.authenticate("jwt") ,(req, res) =>
{
    User.updateUser(req.params.type, req.user, req.body, (data) =>
    {
        res.json(data)
    })
})


// Request route for password change
router.post('/request/password', (req, res) => 
{
    // console.log(req.body)
    User.checkUser(req.body, (data) => res.json(data))
})


// Change user password
router.put('/update/password/user/:ticket', (req, res) =>
{

    test.push(req.params.ticket)
    // console.log(req.params.ticket)
    setTimeout(() => {
        test = test.filter(t => t !== req.params.ticket)
        // console.log(test)
    }, 10000);
    res.sendStatus(200)
    // User.updateUserPassword(req.body, req.body, (data) =>{
    //     // res.json(data)
    // })
})

module.exports = router