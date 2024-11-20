
const searchParams = new URLSearchParams(window.location.search)

const numberDesk = document.querySelector('.number-desk')
const btnAssign = document.querySelector('.btn-assign')
const ticketNumber = document.querySelector('.ticket-number')
const alertInfoQuotes = document.querySelector('.alert-info-quotes')
const ticketQuotes = document.querySelector('.ticket-quotes')

const socket = io()

numberDesk.textContent = searchParams.get('desk')
ticketNumber.textContent = '...'

btnAssign.addEventListener('click', () => {
  const payload = {
    desk: searchParams.get('desk')
  }
  socket.emit('next-ticket', payload, ({ ticket, ticketsQuotes }) => {
    ticketQuotes.textContent = ticketsQuotes

    if (ticket == null) {
      ticketNumber.textContent = 'Nadie'
      alertInfoQuotes.style.setProperty('display', 'block', 'important')
    } else if (ticket !== null) {
      ticketNumber.textContent = ticket.number
      alertInfoQuotes.style.setProperty('display', 'none', 'important')
    }
  })
})

socket.on('ticket-list-assign', (ticket) => {
  if (ticket.length === 0) return (ticketNumber.textContent = 'No hay tickets')

  const ticketAssign = ticket.find((item) => {
    return item.desktop === Number(searchParams.get('desk'))
  })

  if (ticketAssign === undefined) return (ticketNumber.textContent = '-')
  ticketNumber.textContent = ticketAssign.number
})

socket.on('ticket-quotes', (ticket) => {
  ticketQuotes.textContent = ticket
})

socket.on('connect', () => {
  btnAssign.disabled = false
})

socket.on('disconnect', () => {
  btnAssign.disabled = true
})
