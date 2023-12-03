import express from 'express'
import { Report } from '../models/reportModel.js'

const reportsRouter = express.Router()

// Save a new route to database
reportsRouter.post('/', async (request, response) => {
  try {
    if (
      !request.body.location ||
      !request.body.title ||
      !request.body.category ||
      !request.body.body
    ) {
      return response.status(400).send({
        message: "Send all required fields"
      })
    }
    const newReport = {
      location: request.body.location,
      title: request.body.title,
      category: request.body.category,
      body: request.body.body,
    }
    const report = await Report.create(newReport)
    return response.status(201).send(report)

  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message })
  }
})

// Get all routes from database
reportsRouter.get('/', async (request, response) => {
  try {
    const reports = await Report.find({})
    return response.status(200).json({
      count: reports.length,
      data: reports
    })

  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message })
  }
})

// Get single route from database
reportsRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params

    const report = await Report.findById(id)

    return response.status(200).json({
      data: report
    })

  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message })
  }
})

// Update a route from database
reportsRouter.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.location ||
      !request.body.title ||
      !request.body.category ||
      !request.body.body
    ) {
      return response.status(400).send({ message: "Send all required fields" })
    }
    const { id } = request.params
    const result = await Report.findByIdAndUpdate

    if (!result) {
      return response.status(404).json({ message: "Report not found" })
    }

    return response.status(200).send({ message: "Report updates successfully" })

  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message })
  }
})

// Delete a route from database
reportsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params

    const result = await Report.findByIdAndDelete(id)
    if (!result) {
      return response.status(404).json({ message: "Report not found" })
    }
    return response.status(200).send({ message: "Report deleted successfully" })

  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message })
  }
})

export default reportsRouter