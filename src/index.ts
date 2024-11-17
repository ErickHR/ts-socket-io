import App from './app'
import ENVIROMENT from '../config/enviroment'

const app = new App()

app.listen(ENVIROMENT.PORT)

// import { createServer } from 'http'
// import { Server, Socket } from 'socket.io'
// const app = express()

// app.use(express.json())
// app.use(express.static('public'))

// const httpServer = http.createServer(app)

// const io = new Server(httpServer, {})

// io.on('connection', (socket: Socket) => {
//   // ...
// })

// httpServer.listen(3000, () => {
//   console.log(`Listening on port ${3000}`)
// })
