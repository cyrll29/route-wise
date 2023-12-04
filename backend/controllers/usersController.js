import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'

const usersRouter = express.Router()

// HTTP GET ALL USERS
usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
      .populate('reports', {location: 1, title: 1, category: 1})
    return response.status(200).json({
      count: users.length,
      data: users
    })

  } catch (error) {
    console.log("GET ERROR: ", error)
    response.status(500).send({ message: error.message })
  }
})


// HTTP POST
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

export default usersRouter
