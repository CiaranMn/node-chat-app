const chatForm = document.querySelector('#chat-form')
const nameInput = document.querySelector('#name-input')
const textInput = document.querySelector('#text-input')
const chatBox = document.querySelector('#chat-container')
const locButton = document.querySelector('#send-location')

let socket = io();	

socket.on('connect', () => 
  console.log('connected to server!')
)

socket.on('disconnect', () => 
  console.log('connection lost!')
)

socket.on('newMessage', message => {
  renderMessage(message);
})

socket.on('newLocationMessage', message => {
  renderLocMessage(message);
})

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('createMessage', {
    from: nameInput.value, content: textInput.value
  }, () => console.log('Message received by server')
  )
  chatForm.reset();
})

locButton.addEventListener('click', (e) => {
  if (!navigator.geolocation) {
    return alert('Your browser does not support geolocation')
  }

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit('createLocMessage', {
      from: nameInput.value,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, () => alert('Unable to fetch location')
  )
})

function renderLocMessage(message) {
  locMsgEl = document.createElement('div')
  locLink = document.createElement('a')
  locLink.target = "_blank"
  locLink.innerText = `${message.from} sent their location`
  locLink.href = message.url
  locMsgEl.appendChild(locLink)
  chatBox.appendChild(locMsgEl)
  chatBox.scrollTop = chatBox.scrollHeight;
}

function renderMessage(message) {
  chatMsgEl = document.createElement('div')
  chatMsgEl.innerText = `
  ${message.from} [${message.createdAt}]: ${message.content} 
  `
  chatBox.appendChild(chatMsgEl)
  chatBox.scrollTop = chatBox.scrollHeight;
}

