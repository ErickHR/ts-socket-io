
const socket = io()

const showOffLine = document.querySelectorAll('.show-offline')
const showOnline = document.querySelectorAll('.show-online')

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

  showOffLine.forEach(element => {
    element.classList.add('d-none')
  })
  showOnline.forEach(element => {
    element.classList.remove('d-none')
  })
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')

  showOffLine.forEach(element => {
    element.classList.remove('d-none')
  })
  showOnline.forEach(element => {
    element.classList.add('d-none')
  })
})

socket.on('message', (message) => {
  console.log(message)
})
