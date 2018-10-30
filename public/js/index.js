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
    from: nameInput.value,
    content: textInput.value
  }, () => console.log('Message received by server')
  )
  chatForm.reset();
})

locButton.addEventListener('click', (e) => {
  if (!navigator.geolocation) {
    return alert('Your browser does not support geolocation')
  }

  locButton.innerText = 'Sending location...'
  locButton.disabled = 'disabled'

  navigator.geolocation.getCurrentPosition(position => {
    locButton.removeAttribute('disabled')
    locButton.innerText = 'Send location'
    socket.emit('createLocMessage', {
      from: nameInput.value,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, () => { 
    alert('Unable to fetch location')
    locButton.removeAttribute('disabled')
    locButton.innerText = 'Send location'
   }
  )
})

function renderLocMessage(message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  locMsgEl = document.createElement('li')
  locLink = document.createElement('a')
  locLink.target = "_blank"
  locLink.innerText = `${message.from} [${formattedTime}] My current location`
  locLink.href = message.url
  locMsgEl.appendChild(locLink)
  chatBox.appendChild(locMsgEl)
  scroll()
}

function renderMessage(message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  chatMsgEl = document.createElement('li')
  chatMsgEl.innerText = `
  ${message.from} [${formattedTime}]: ${message.content} 
  `
  chatBox.appendChild(chatMsgEl)
  scroll()
}

function scroll() {
  let lastMessage = chatBox.lastChild
  let prevMessage = lastMessage.previousSibling
  let clientHeight = chatBox.clientHeight
  let scrollTop = chatBox.scrollTop
  let scrollHeight = chatBox.scrollHeight
  if (clientHeight + scrollTop + lastMessage.clientHeight + prevMessage.clientHeight >= scrollHeight) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

