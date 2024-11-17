
import * as dotenv from 'dotenv'

dotenv.config()

const ENVIROMENT = {
  PORT: Number(process.env.PORT)
}

export default ENVIROMENT
