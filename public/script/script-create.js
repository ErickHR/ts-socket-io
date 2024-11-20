
const socket = io()

const btnCreate = document.querySelector('.btn-create')
const info = document.querySelector('.info__title')

btnCreate.addEventListener('click', () => {
  info.textContent = 'Cargando...'
  socket.emit('create-ticket', null, (id) => {
    info.textContent = `Ticket ${id}`
  })
})

socket.on('connect', () => {
  btnCreate.disabled = false
})

socket.on('disconnect', () => {
  btnCreate.disabled = true
})

socket.on('last-ticket', (ticket) => {
  info.textContent = `Ticket ${ticket}`
})
