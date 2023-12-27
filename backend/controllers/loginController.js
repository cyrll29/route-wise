import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' })
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