import dotenv from 'dotenv'
dotenv.config()



const {
  PORT,
  
  MONGODB_URI,
  ACCESS_TOKEN_SECRET,

  HOST,
  SERVICE,
  EMAIL_PORT,
  SECURE,
  USER,
  PASS,
  TWILIO_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER
} = process.env

const URL_USED = 'http://localhost:3000'
// const URL_USED = 'https://1s27xj69-3000.asse.devtunnels.ms'

const config = {
  PORT,
  MONGODB_URI,
  ACCESS_TOKEN_SECRET,
  HOST,
  SERVICE,
  EMAIL_PORT,
  SECURE,
  USER,
  PASS,
  URL_USED,
  TWILIO_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER
}

export default config