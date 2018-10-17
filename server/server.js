const http = require('http')
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app)
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', (message) => {
    console.log(`Message received: ${JSON.stringify(message, undefined, 2)}`)
  })

  socket.emit('newMessage', {
    from: "John",
    content: 'Whooooo!',
    createdAt: new Date().toLocaleString()
  });

  socket.on('disconnect', () => 
  console.log('User disconnected'));
})


app.use((request, response, next) => {
  let now = new Date().toLocaleString()
  console.log(`${now}: ${request.method} '${request.url}'`)
  next();
})

app.use(express.static(publicPath))

server.listen(port, () => console.log('Server listening on port 3000'))


