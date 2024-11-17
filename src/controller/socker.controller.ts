import { Socket } from 'socket.io'

export default class SockerController {
  socket (socket: Socket): void {
    console.log('a user connected ' + socket.id)
    socket.on('disconnect', () => {
      console.log('user disconnected clea' + socket.id)
    })

    socket.on('message', (payload, callback) => {
      const payloadMessage = 'se envia parametros desde el servidor'
      callback(payloadMessage)
      socket.broadcast.emit('message', payload)
    })
  }
}
