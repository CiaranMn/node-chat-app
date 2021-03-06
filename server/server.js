const http = require('http')
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app)
const io = socketIO(server);

const { generateMessage, generateLocationMessage } = require('./util/message')
const { isRealString } = require('./util/validation')
const now = () => new Date().toLocaleString()

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room) ) {
      callback('Name and room must be supplied')
    } 
    socket.join(params.room)
    callback()

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'))

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', 'A user joined the chat!'))
  })

  socket.on('createMessage', (message, callback) => {
    console.log(`Message received [${now()}]: ${JSON.stringify(message, undefined, 2)} `)
    io.emit('newMessage', generateMessage(message.from, message.content))
    callback()
  })

  socket.on('createLocMessage', location => {
    io.emit('newLocationMessage', generateLocationMessage(location.from, location.latitude, location.longitude) )
  })

  socket.on('disconnect', () => 
  console.log('User disconnected'));
})

app.use((request, response, next) => {
  console.log(`${now()}: ${request.method} '${request.url}'`)
  next();
})

app.use(express.static(publicPath))

server.listen(port, () => console.log('Server listening on port 3000'))



