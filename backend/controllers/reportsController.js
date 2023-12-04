import express from 'express'
import Report from '../models/reportModel.js'
import User from '../models/userModel.js'

const reportsRouter = express.Router()

// Save a new route to database
reportsRouter.post('/', async (request, response) => {

  const body = request.body

  try {
    if (!body.location || !body.title || !body.category || !body.body) {
      return response.status(400).send({ message: "Send all required fields" })
    }

    const user = await User.findById(body.userId)

    const report = new Report ({
      location: body.location,
      title: body.title,
      category: body.category,
      body: body.body,
      user: user.id
    })

    const savedReport = await report.save()
    user.reports = user.reports.concat(savedReport._id)
    await user.save()

    return response.status(201).json({
      message: "Report created successfully",
      savedReport
    })

  } catch (error) {
    console.log("POST ERROR: ", error)
    response.status(500).send({ message: error.message })
  }
})

// Get all routes from database
reportsRouter.get('/', async (request, response) => {
  try {
    const reports = await Report.find({})
      .populate('user', { username: 1, name: 1 })

    return response.status(200).json({
      count: reports.length,
      data: reports
    })

  } catch (error) {
    console.log("GET ERROR: ", error)
    response.status(500).send({ message: error.message })
  }
})

// Get single route from database
reportsRouter.get('/:id', async (request, response) => {

  const { id } = request.params

  try {
    const report = await Report.findById(id)

    if (report) {
      return response.status(200).json({ 
        message: "ID Found",
        data: report 
      })
    } else {
      return response.status(404).end()
    }

  } catch (error) {
    console.log("GET ID ERROR: ", error)
    response.status(500).send({ message: error.message })
  }
})

// Update a route from database
reportsRouter.put('/:id', async (request, response) => {

  const body = request.body
  const { id } = request.params

  try {
    if (!body.location || !body.title || !body.category || !body.body) {
      return response.status(400).send({ message: "Send all required fields" })
    }

    const report = {
      location: body.location,
      title: body.title,
      category: body.category,
      body: body.body,
    }

    Report.findByIdAndUpdate(id, report, { new: true })
      .then(updatedReport => {
        return response.status(200).json({
          message: "Report updates successfully",
          updatedReport
        })
      })
      .catch((error) => {
        console.log(error)
        return response.status(400).json({ message: "Report not found" })
      })

  } catch (error) {
    console.log("PUT ERROR: ", error)
    response.status(500).send({ message: error.message })
  }
})

// Delete a route from database
reportsRouter.delete('/:id', async (request, response) => {

  const { id } = request.params

  try {
    const result = await Report.findByIdAndDelete(id)

    if (!result) {
      return response.status(404).json({ message: "Report not found" })
    }
    return response.status(200).send({ 
      message: "Report deleted successfully",
      result
    })

  } catch (error) {
    console.log("DELETE ERROR: ", error)
    response.status(500).send({ message: error.message })
  }
})

export default reportsRouter