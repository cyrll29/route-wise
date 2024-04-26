import express from 'express'
import Report from '../models/reportModel.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import config from '../utils/config.js'
const reportsRouter = express.Router()

// Authorization
const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


reportsRouter.get('/', async (req, res) => {
  try {
    const reports = await Report
      .find({})
      .populate('user', { name: 1 })
      
    return res.status(200).json({
      count: reports.length,
      data: reports
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    })
  }
})


reportsRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const report = await Report.findById(id)
    if (report) {
      return res.status(200).json({ 
        data: report 
      })
    }
    
    return res.status(404).json({ 
      message: "User ID does not exist" 
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    })
  }
})

const TTL_DURATIONS = {
  "Traffic Jam": { "Low": 60 * 1, "Medium": 60 * 2, "High": 60 * 3 },
  "Flood": { "low": 60 * 60, "medium": 2 * 60 * 60, "high": 4 * 60 * 60 },
  // Add other categories and durations as needed
};

reportsRouter.post('/', async (req, res) => {
  const {location, latLng, title, category, severity, body} = req.body

  try {
    if (!location || !latLng || !title || !category || !severity || !body) {
      return res.status(400).json({ 
        message: "Please provide values for all required fields: location, title, category, and body." 
      })
    }
    console.log(category.label)
    console.log(severity.label)
    console.log(TTL_DURATIONS)

    const ttlDuration = TTL_DURATIONS[category.label][severity.label];
    console.log(ttlDuration)
    console.log("end")
    // Token Verification
    const decodedToken = jwt.verify(getTokenFrom(req), config.ACCESS_TOKEN_SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ 
        error: 'token invalid' 
      })
    }

    // Save Report
    const user = await User.findById(decodedToken.id)
    const report = new Report ({
      location: location,
      latLng: latLng,
      title: title,
      category: category,
      ttlDuration: ttlDuration, // Include TTL duration in the report
      user: user.id,
    })
    const savedReport = await report.save()

    // Create TTL index with dynamic TTL duration
    await Report.collection.dropIndex("createdAt_1");
    await Report.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: ttlDuration });

    // Update User document
    user.reports = user.reports.concat(savedReport._id)
    await user.save()
    return res.status(201).json({ 
      message: "Report created successfully",
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error"
    })
  }
})


reportsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const data = await Report.findByIdAndDelete(id)
    if (!data) {
      return res.status(404).json({ 
        message: "Report not found" 
      })
    }
    return res.status(200).json({
      message: "Report deleted successfully",
    })

  } catch (error) {
    res.status(500).json({ 
      message: "Internal server error"
    })
  }
})

export default reportsRouter