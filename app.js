const path = require('path')
const express = require("express")
const app = express()
const socketIO = require('socket.io')

const port = 3000

app.set('port', process.env.PORT || port)

app.use(express.static(path.join(__dirname, 'public')))

const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})

const io = socketIO(server)

io.on('connection', (socket) => {
  console.log("New connection")
    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data)
    })

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data)
    })
})