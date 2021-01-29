const router = require('express').Router()
const passport = require('passport')
const jwt = require("jsonwebtoken");
const Message = require('../controllers/Message')

// Get messages
router.get('/messages/:id', passport.authenticate("jwt"),(req,res) =>{
    Message.getMessage('get', req.params.id, req.user._id, (data) =>{
        res.json(data)
    })
})

// Create new message
router.post('/messages/:id', passport.authenticate("jwt"),(req,res) =>{
    // console.log(req.params)
    Message.createMessage('create',req.body, req.params.id, req.user._id, (data) =>{
        res.json(data)
    })
})

// Update message
router.put('/messages/:params', passport.authenticate("jwt"),(req,res) =>{
    
})

// Delete message
router.delete('/messages/:params', passport.authenticate("jwt"),(req,res) =>{
    
})
module.exports = router