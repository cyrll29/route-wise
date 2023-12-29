import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.MONGODB_URI
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const HOST = process.env.HOST
const SERVICE = process.env.SERVICE
const EMAIL_PORT = process.env.EMAIL_PORT
const SECURE = process.env.SECURE
const USER = process.env.USER
const PASS = process.env.PASS



const config = {
  PORT,
  MONGODB_URI,
  ACCESS_TOKEN_SECRET,
  HOST,
  SERVICE,
  EMAIL_PORT,
  SECURE,
  USER,
  PASS
}

export default config