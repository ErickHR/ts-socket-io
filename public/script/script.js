
const socket = io()

const btnSend = document.querySelector('.send')
const btnMessage = document.querySelector('.message')

btnSend.addEventListener('click', () => {
  const message = btnMessage.value

  const payload = {
    id: socket.id,
    message
  }
  socket.emit('message', payload, (id) => {
    console.log(`Message sent ${id}`)
  })
})

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})

socket.on('message', (message) => {
  console.log(message)
})
