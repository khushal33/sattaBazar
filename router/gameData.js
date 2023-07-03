const express = require('express')
const router = express.Router()
const {verifyToken} = require('../controllers/auth')
const {postGameData,updateGameData,getGameData,getAdminGameData} = require('../controllers/gameData')

router.get('/',verifyToken,async (req,res)=>{
    getGameData(req,res).then((data)=>{
        res.status(200).send(data)
        }).catch((err)=>{
            res.status(400).send(err)
        })
})

router.get('/admin',verifyToken,async (req,res)=>{
    getAdminGameData(req,res).then((data)=>{
        res.status(200).send(data)
        }).catch((err)=>{
            res.status(400).send(err)
        })
})

router.post('/',verifyToken,async (req,res)=>{
    postGameData(req,res).then((data)=>{
    res.status(200).send(data)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.patch('/',verifyToken,async (req,res)=>{
    updateGameData(req,res).then((data)=>{
    res.status(200).send(data)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})


module.exports = router;