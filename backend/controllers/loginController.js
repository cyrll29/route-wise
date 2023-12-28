import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import Token from '../models/token.js'
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'
const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ 
      errorType: "Inputs",
      message: "User has entered invalid email or password"
    })
  }

  if (!user.verified) {
    let token = await Token.findOne({ userId: user._id })
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex")
      }).save()
      const url = `http://localhost:3001/api/users/${user._id}/verify/${token.token}`
      await sendEmail(user.email, "Verify Email", url)

      return res.status(401).json({
        errorType: "Unverified Email",
        message: "A mail is sent to your account, please verify your email"
      })
    }
    return res.status(401).json({
      errorType: "Unverified Email",
      message: "Your email is not verified. Please check your email"
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id
  }

  const token = jwt.sign(
    userForToken, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 60*60 }
  )

  res.status(200).send({
    token,
    email: user.email,
    name: user.name
  })
})

export default loginRouter