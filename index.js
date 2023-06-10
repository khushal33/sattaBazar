const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const https = require('https')
require('dotenv').config();
const { connect } = require('mongoose');
const socketio = require('socket.io');


global.env  = process.env.NODE_ENV
const {dataBase: { dbConnectionString }} = require('./config').config[env]

app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())

/**Routes  */
const userRouter = require('./router/auth')
const adminRouter = require('./router/adminTalks')
app.use('/api/user/',userRouter)
app.use('/api/admin/',adminRouter)


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


