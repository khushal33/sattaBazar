const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const https = require('https')
require('dotenv').config();
const { connect } = require('mongoose');
const socketio = require('socket.io');
const GameData = require('./models/gameData')

const {updateGameData} = require('./controllers/gameData')


global.env  = process.env.NODE_ENV
const {dataBase: { dbConnectionString }} = require('./config').config[env]

app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())

/**Routes  */
const userRouter = require('./router/auth')
const adminRouter = require('./router/adminTalks')
const gameRouter = require('./router/gameData')
app.use('/api/user/',userRouter)
app.use('/api/admin/',adminRouter)
app.use('/api/game/',gameRouter)

//
const startServer = async () =>{
    /** Node server  */
    let PORT = process.env.PORT
    if(process.env.NODE_ENV == 'LOCAL'){
        let server = app.listen(PORT,async ()=>{
            console.log("Server is running on port ",PORT)
        })

        global.io = socketio(server)

        io.on('connection', (socket) => {
            console.log('New connection')
            
            socket.on('message', (message) => {
                console.log('New connection',message)
                
            })


            socket.on('start',async (res) => {
                try{
                    let req = {
                        gameStatus : 'start',
                        natepute : {
                            zero:0,
                            one:0,
                            two:0,
                            three:0,
                            four:0,
                            five:0,
                            six:0,
                            seven:0,
                            eight:0,
                            nine:0,
                        },
                        akluj : {
                            zero:0,
                            one:0,
                            two:0,
                            three:0,
                            four:0,
                            five:0,
                            six:0,
                            seven:0,
                            eight:0,
                            nine:0,
                        }
                    }
                    await GameData.updateMany({},req)
                    console.log("start",res);
                    io.emit("startTrigger",res)
                }catch(err){
                    console.log("error",err.message);
                } 
            })
    
            socket.on('stop',async (res) => {
                try{
                    let req = {
                        gameStatus : 'stop'
                    }
                    await updateGameData({body:req},{})
                    io.emit("stopTrigger",res)  
                }catch(err){
                    console.log("error",err.message);
                }
            })
            socket.on('reload', async (res) => {
                try{
                    let req = {
                        gameStatus : 'reload'
                    }
                    await updateGameData({body:req},{})
                    io.emit("reloadTrigger",res)
                }catch(err){
                    console.log("error",err.message);
                }
            })
        })

        

    }else{
        let options = {
            key: fs.readFileSync(path.resolve(__dirname,'./configs/SSL/private.key')),
            cert: fs.readFileSync(path.resolve(`${__dirname}/configs/SSL/certificate.crt`)),
            ca: fs.readFileSync(path.resolve(`${__dirname}/configs/SSL/ca_bundle.ca`))
        }
        let server = https.createServer(options,app)
        server.listen(PORT,async ()=>{
            console.log("Server is running on port ",PORT)
        })
    }

    /** Mongo server */
    await connect(
        dbConnectionString,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true
        }
    ).then(() => console.log('MongoDB connection established.'))
}


startServer()

module.exports = app;


