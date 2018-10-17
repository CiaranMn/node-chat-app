let socket = io();	

socket.on('connect', function () {
  console.log('connected to server!')

  socket.emit('createMessage', {
    from: "Ciaran",
    content: "Cool app!"
  })
})

socket.on('disconnect', function () {
  console.log('connection lost!')
})

socket.on('newMessage', function(message) {
  console.log('newMessage', message)
})
