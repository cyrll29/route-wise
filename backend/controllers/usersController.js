import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import validator from 'validator'
const usersRouter = express.Router()


// http get
usersRouter.get('/', async (req, res) => {
  try {
    const users = await User
      .find({})
      .populate('reports', {location: 1, title: 1, category: 1})
      
    return res.status(200).json({ 
      count: users.length, 
      data: users 
    })
  } 

  catch (error) {
    res.status(500).send({ message: error.message })
  }
})


// http post
usersRouter.post('/', async (req, res) => {
  const { name, password, email } = req.body

  try {
    // Email Validation
    const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailValidation.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Password Validation
    if (!validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
      return res.status(400).json({ error: "Set a Strong Password" })
    }

    // Password Hashing
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Save User
    const user = new User({
      name,
      passwordHash,
      email,
    })
    const savedUser = await user.save()
    res.status(201).json({data: savedUser})
  } 

  catch (error) {
    res.status(500).send({ message: error.message })
  }
})


// http delete
usersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const data = await User.findByIdAndDelete(id)

    if (!data) {
      return res.status(404).json({ message: "Report not found" })
    }

    return res.status(200).send({ message: "Report deleted successfully"})
  } 
  
  catch (error) {
    res.status(500).send({ message: error.message })
  }
})

export default usersRouter
