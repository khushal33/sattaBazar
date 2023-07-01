const GameData = require('../models/gameData')

const getGameData = (req,res) =>{
    return new Promise(async (resolve,reject)=>{
        try{
            let data = await GameData.find({})
            resolve({status:true,message:  data[0] })
        }catch(err){
            reject({status:true,message:err.message})
        }
    })
}

const getAdminGameData = (req,res) =>{
    return new Promise(async (resolve,reject)=>{
        try{
            let data = await GameData.find({})
            let adminSumUp = {
                zero: data[0].natepute.zero + data[0].akluj.zero,
                one: data[0].natepute.one + data[0].akluj.one,
                two: data[0].natepute.two + data[0].akluj.two,
                three: data[0].natepute.three + data[0].akluj.three,
                four: data[0].natepute.four + data[0].akluj.four,
                five: data[0].natepute.five + data[0].akluj.five,
                six: data[0].natepute.six + data[0].akluj.six,
                seven: data[0].natepute.seven + data[0].akluj.seven,
                eight: data[0].natepute.eight + data[0].akluj.eight,
                nine: data[0].natepute.nine + data[0].akluj.nine,
            }
            resolve({status:true,message:  adminSumUp })
        }catch(err){
            reject({status:true,message:err.message})
        }
    })
}
const postGameData = (req,res) =>{
    return new Promise(async (resolve,reject)=>{
        try{
            await GameData.create({})
            resolve({status:true,message:"Document Created"})
        }catch(err){
            reject({status:true,message:err.message})
        }
    })
}

const updateGameData = (req,res) =>{
    return new Promise(async (resolve,reject)=>{
        let {natepute,akluj,gameStatus,gameResult} = req.body
        try{
            let data = await GameData.findOne({})
            let finalObj = {}
            if(gameStatus){
                finalObj.gameStatus = gameStatus
            }
            if(gameResult){
                finalObj.gameResult = gameResult
            }
            if(natepute){
                finalObj.natepute = {
                    one : natepute.one ? (natepute.one + data.natepute.one) : data.natepute.one,
                    two : natepute.two ? (natepute.two + data.natepute.two) : data.natepute.two,
                    three : natepute.three ? (natepute.three + data.natepute.three) : data.natepute.three,
                    four : natepute.four ? (natepute.four + data.natepute.four) : data.natepute.four,
                    five : natepute.five ? (natepute.five + data.natepute.five) : data.natepute.five,
                    six : natepute.six ? (natepute.six + data.natepute.six) : data.natepute.six,
                    seven : natepute.seven ? (natepute.seven + data.natepute.seven) : data.natepute.seven,
                    eight : natepute.eight ? (natepute.eight + data.natepute.eight) : data.natepute.eight,
                    nine : natepute.nine ? (natepute.nine + data.natepute.nine) : data.natepute.nine,
                }
                io.emit("natepute",finalObj.natepute)
            }
            if(akluj){
                finalObj.akluj = {
                    one : akluj.one ? (akluj.one + data.akluj.one) : data.akluj.one,
                    two : akluj.two ? (akluj.two + data.akluj.two) : data.akluj.two,
                    three : akluj.three ? (akluj.three + data.akluj.three) : data.akluj.three,
                    four : akluj.four ? (akluj.four + data.akluj.four) : data.akluj.four,
                    five : akluj.five ? (akluj.five + data.akluj.five) : data.akluj.five,
                    six : akluj.six ? (akluj.six + data.akluj.six) : data.akluj.six,
                    seven : akluj.seven ? (akluj.seven + data.akluj.seven) : data.akluj.seven,
                    eight : akluj.eight ? (akluj.eight + data.akluj.eight) : data.akluj.eight,
                    nine : akluj.nine ? (akluj.nine + data.akluj.nine) : data.akluj.nine,
                }
                io.emit("akluj",finalObj.akluj)
            }
            await GameData.updateMany({},finalObj)
            let adminres = await getAdminGameData({},{})
            io.emit("admin",adminres)
            resolve({status:true,message:"Document Updated"})
        }catch(err){
            reject({status:true,message:err.message})
        }
    })
}

module.exports = {postGameData ,updateGameData , getGameData , getAdminGameData}