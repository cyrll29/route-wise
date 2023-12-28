import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import Token from '../models/token.js'
import sendEmail from '../utils/sendEmail.js'
import validator from 'validator'
import crypto from 'crypto'
const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User
      .find({})
      .populate('reports', {location: 1, title: 1, category: 1})
    return res.status(200).json({ 
      count: users.length, 
      data: users 
    })

  } catch (error) {
    res.status(500).json({ 
      errorType: "Server Error",
      message: error.message 
    })
  }
})


usersRouter.post('/', async (req, res) => {
  const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const { name, password, email } = req.body

  try {
    // Email Uniqueness
    let user = await User.findOne({ email: email })
    if (user) {
      return res.status(409).json({ 
        errorType: "Email Exists" ,
        message: "User with given email is existing" 
      })
    }

    if (!name || !email || !password) {
      return res.status(404).json({
        errorType: "Missing Input",
        message: "Please Input all the Required Fields"
      })
    }

    // Email and Password Validation
    if (!emailValidation.test(email) 
        && !validator.isStrongPassword(password, {
          minLength: 8, minLowercase: 1, minUppercase: 1, 
          minNumbers: 1, minSymbols: 1 
    })) {
      return res.status(400).json({
        errorType: "Invalid Email Format and Weak Password",
        message: "Please use the format ex.'@gmail.com' and choose a stronger password. It should have at least 8 characters, including uppercase and lowercase letters, numbers, and special symbols.."
      })
    }

    // Email Validation
    if (!emailValidation.test(email)) {
      return res.status(400).json({ 
        errorType: "Invalid Email Format",
        message: "Please use the format ex.'@gmail.com'." 
      });
    }

    // Password Validation
    if (!validator.isStrongPassword(password, {
      minLength: 8, 
      minLowercase: 1, 
      minUppercase: 1, 
      minNumbers: 1, 
      minSymbols: 1 
    })) {
      return res.status(400).json({ 
        errorType: "Weak Password",
        message: "Please choose a stronger password. It should have at least 8 characters, including uppercase and lowercase letters, numbers, and special symbols." })
    }

    // Password Hashing
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    user = await new User({
      name,
      passwordHash,
      email,
    }).save()

    res.status(201).json({
      message: "Registration Successful",
      data: user
    })

    // Create Token
    const token = await new Token({
      userId: user.id,
      token: crypto.randomBytes(32).toString('hex')
    }).save()

    const url = `http://localhost:3001/users/${user.id}/verify/${token.token}`
    await sendEmail(user.email, "Verify Email", url)
    res.status(201).json({
      message: "An Email sent to your account please verify"
    })

  } catch (error) {
    res.status(500).send({ 
      errorType: "Server Error", 
      message: error.message 
    })
  }
})

usersRouter.get('/:id/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({id: req.params.id})
    if (!user) {
      return res.status(400).json({
        message: "Invalid link"
      })
    }

    const token = await Token.findOne({
      userId: user.id,
      token: req.params.token
    })
    if (!token) {
      return res.status(400).json({
        message: "Invalid link"
      })
    }

    await User.updateOne({id: user.id, verified: true})
    await token.remove()

    res.status(200).json({
      message: "Email verified successfully"
    })

  } catch (error) {
    
  }
})


usersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const data = await User.findByIdAndDelete(id)

    if (!data) {
      return res.status(404).json({ 
        errorType: "Unknown User",
        message: "User is not found" 
      })
    }

    return res.status(200).json({ 
      message: "User deleted successfully",
      deletedData: data
    })

  } catch (error) {
    res.status(500).json({ 
      errorType: "Server Error",
      message: error.message 
    })
  }
})

export default usersRouter
