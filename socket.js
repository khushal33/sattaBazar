const express = require('express');
const socketio = require('socket.io');
const { v4: uuidv4 } = require('uuid');
let app = express()
const port = 8000;
let server = app.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});


const io = socketio(server)

io.on('connection', (socket) => {
    console.log('New connection')

    socket.on('message', (...username) => {
        console.log('New connection',username)
    })
})




