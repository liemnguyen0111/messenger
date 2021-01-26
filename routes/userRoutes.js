const router = require('express').Router()
const passport = require('passport')
const jwt = require("jsonwebtoken");
const User = require('../controllers/User')

// Login route
router.post('/login/user', (req, res ) =>
{
    User.loginUser(req.body, (data) => {
        res.json(data)
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
router.put('/update/info/user', passport.authenticate("jwt") ,(req, res) =>
{
    User.updateUser(req.user._id, req.body, (data) =>
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
        console.log(test)
    }, 10000);
    res.json(200)
    // User.updateUserPassword(req.body, req.body, (data) =>{
    //     // res.json(data)
    // })
})

module.exports = router