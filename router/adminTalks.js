const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')


router.post('/message',authController.verifyToken,async (req,res)=>{
    const {message} = req.body
    // authController.signIn(req).then((user)=>{
        io.emit("message",message)
    res.status(200).send(message)
    // }).catch((err)=>{
    //     res.status(400).send(err)
    // })
})

module.exports = router;