import express from 'express'
import { Route } from '../models/routeModel.js'

const routesRouter = express.Router()

// Save a new route to database
routesRouter.post('/', async (request, response) => {
  try {
    if (
      !request.body.origin ||
      !request.body.destination ||
      !request.body.transportation
    ) {
      return response.status(400).send({
        message: "Send all required fields"
      })
    }
    const newRoute = {
      origin: request.body.origin,
      destination: request.body.destination,
      transportation: request.body.transportation,
      firstRoute: "LRT2 Recto to LRT2 Pureza",
      secondRoute: "Punta - Quiapo Jeep",
      thirdRoute: request.body.thirdRoute
    }
    const route = await Route.create(newRoute)
    return response.status(201).send(route)

  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message })
  }
})

// Get all routes from database
routesRouter.get('/', async (request, response) => {
  try {
    const routes = await Route.find({})
    return response.status(200).json({
      count: routes.length,
      data: routes
    })

  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message })
  }
})

// Get single route from database
routesRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params

    const route = await Route.findById(id)

    return response.status(200).json({
      data: route
    })

  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message })
  }
})

// Update a route from database
routesRouter.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.origin ||
      !request.body.destination ||
      !request.body.transportation
    ) {
      return response.status(400).send({ message: "Send all required fields" })
    }
    const { id } = request.params
    const result = await Route.findByIdAndUpdate

    if (!result) {
      return response.status(404).json({ message: "Route not found" })
    }

    return response.status(200).send({ message: "Route updates successfully" })

  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message })
  }
})

// Delete a route from database
routesRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params

    const result = await Route.findByIdAndDelete(id)
    if (!result) {
      return response.status(404).json({ message: "Route not found" })
    }
    return response.status(200).send({ message: "Route deleted successfully" })

  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message })
  }
})

export default routesRouter