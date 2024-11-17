import express, { Express } from 'express'
import * as http from 'http'
import { Server } from 'socket.io'
import SockerController from './controller/socker.controller'

const socketController = new SockerController()

export default class App {
  app: Express
  io?: any
  httpServer?: any

  constructor () {
    this.app = express()

    this.app.use(express.json())
    this.app.use(express.static('public'))

    this.socket()
  }

  socket (): void {
    this.httpServer = http.createServer(this.app)
    this.io = new Server(this.httpServer, {})

    this.io.on('connection', socketController.socket)
  }

  listen (port: number): void {
    this.httpServer.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  }
}
