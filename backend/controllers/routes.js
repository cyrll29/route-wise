import express from 'express'
import { Route } from '../models/routeModel.js'

const routesRouter = express.Router()

// Save a new route to database
routesRouter.post('/', async (request, response) => {

  const body = request.body

  try {
    if (!body.origin || !body.destination || !body.transportation) {
      return response.status(400).send({ message: "Send all required fields" })
    }

    const route = new Route ({
      origin: body.origin,
      destination: body.destination,
      transportation: body.transportation,
      firstRoute: "LRT2 Recto to LRT2 Pureza",
    })

    const savedRoute = await route.save()
    return response.status(201).json({
      message: "Route created successfully",
      savedRoute
    })

  } catch (error) {
    console.log("POST ERROR: ", error)
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
    console.log("GET ERROR: ", error)
    response.status(500).send({ message: error.message })
  }
})

// Get single route from database
routesRouter.get('/:id', async (request, response) => {

  const { id } = request.params

  try {
    const route = await Route.findById(id)

    if (route) {
      return response.status(200).json({ 
        message: "ID Found",
        data: route 
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
routesRouter.put('/:id', async (request, response) => {

  const body = request.body
  const { id } = request.params

  try {
    if (!body.origin || !body.destination || !body.transportation) {
      return response.status(400).send({ message: "Send all required fields" })
    }
    
    const route = {
      origin: body.origin,
      destination: body.destination,
      transportation: body.transportation,
      firstRoute: "LRT2 Recto to LRT2 Pureza",
    }

    Route.findByIdAndUpdate(id, route, { new: true })
      .then(updatedRoute => {
        return response.status(200).json({
          message: "Report updates successfully",
          updatedRoute
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
routesRouter.delete('/:id', async (request, response) => {

  const { id } = request.params

  try {
    const result = await Route.findByIdAndDelete(id)

    if (!result) {
      return response.status(404).json({ message: "Route not found" })
    }
    return response.status(200).send({ 
      message: "Route deleted successfully",
      result
    })

  } catch (error) {
    console.log("DELETE ERROR: ", error)
    response.status(500).send({ message: error.message })
  }
})

export default routesRouter