import fs from 'fs'
import path from 'path'
import Ticket from './ticket.model'

export default class TicketList {
  private _last: number = 0
  private _tickets: Ticket[] = []
  private _first_for: Ticket[] = []
  private readonly _day: number = new Date().getDate()

  constructor () {
    this.init()
  }

  init (): void {
    const day = new Date().getDate()

    const ticketFile = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../data/ticket.json'), 'utf-8'))

    if (ticketFile.day === day) {
      this._last = ticketFile.last
      this._tickets = ticketFile.tickets.map(
        (ticket: any) => new Ticket(ticket.number, ticket.desktop)
      )
      this._first_for = ticketFile.first_for.map(
        (ticket: any) => new Ticket(ticket.number, ticket.desktop)
      )
    } else {
      this.saveFile()
    }
  }

  get toJSON (): any {
    return {
      last: this._last,
      tickets: this._tickets.map(ticket => ticket.toJSON),
      first_for: this._first_for.map(ticket => ticket.toJSON),
      day: this._day
    }
  }

  saveFile (): void {
    const pathData = path.join(__dirname, '/../../data/ticket.json')
    fs.writeFileSync(pathData, JSON.stringify(this.toJSON))
  }

  saveTicket (): number {
    this._last++
    this._tickets.push(new Ticket(this._last, null))
    this.saveFile()
    return this._last
  }

  assignTicket (desk: number): any {
    if (this._tickets.length === 0) return null

    const ticket = this._tickets.shift()
    if (ticket !== undefined) {
      ticket.desk = desk
      this._first_for.unshift(ticket)
      if (this._first_for.length > 4) this._first_for.splice(-1, 1)

      this.saveFile()
      return ticket.toJSON
    }

    return null
  }

  get last (): number { return this._last }

  get tickets (): Ticket[] { return this._tickets }
}
