let socket = io();	

socket.on('connect', () => 
  console.log('connected to server!')
)

socket.on('disconnect', () => 
  console.log('connection lost!')
)

socket.on('newMessage', (message) => {
  renderMessage(message)
})

const chatForm = document.querySelector('#chat-form')
const nameInput = document.querySelector('#name-input')
const textInput = document.querySelector('#text-input')
const chatBox = document.querySelector('#chat-container')

chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  socket.emit('createMessage', {
    from: nameInput.value, content: textInput.value
  }, () => console.log('Message received by server')
  )

  chatForm.reset()

})

function renderMessage(message) {
  chatMsgEl = document.createElement('div')
  chatMsgEl.innerText = `
  ${message.from} [${message.createdAt}]: ${message.content} 
  `
  chatBox.appendChild(chatMsgEl)
  chatBox.scrollTop = chatBox.scrollHeight;
}