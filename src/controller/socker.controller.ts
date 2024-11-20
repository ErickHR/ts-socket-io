import { Socket } from 'socket.io'
import TicketList from '../model/ticketList.model'

const ticketList = new TicketList()
export default class SockerController {
  socket (socket: Socket): void {
    const ticket = ticketList.last

    socket.emit('last-ticket', ticket)
    socket.emit('ticket-list-assign', ticketList.toJSON.first_for)

    socket.emit('ticket-list', ticketList.toJSON.first_for)

    console.log('a user connected ' + socket.id)
    socket.on('disconnect', () => {
      console.log('user disconnected clea' + socket.id)
    })

    socket.on('create-ticket', (payload, callback) => {
      const id = ticketList.saveTicket()
      callback(id)
      socket.broadcast.emit('last-ticket', id)
      socket.broadcast.emit('ticket-quotes', ticketList.tickets.length)
    })

    socket.on('next-ticket', ({ desk }, callback) => {
      const ticket = ticketList.assignTicket(desk)
      const payload = { ticket, ticketsQuotes: ticketList.tickets.length }
      callback(payload)
      socket.broadcast.emit('ticket-list', ticketList.toJSON.first_for)
      socket.broadcast.emit('ticket-quotes', ticketList.tickets.length)
    })
  }
}
