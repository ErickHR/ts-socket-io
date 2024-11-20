
const socket = io()

const numberDeskFirst = document.querySelectorAll('.number-desk')
const ticketNumber = document.querySelectorAll('.ticket-number')

socket.on('ticket-list', (payload) => {
  const audio = new Audio('/audio/new-ticket.mp3')
  audio.play()

  payload.forEach((element, index) => {
    numberDeskFirst[index].textContent = element.desktop
    ticketNumber[index].textContent = element.number
  })
})

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('disconnect', () => {
  console.log('Connected to server')
})
