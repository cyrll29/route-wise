import express from 'express'
import Route from '../models/routeModel.js'
const routesRouter = express.Router()


routesRouter.get('/', async (req, res) => {
  try {
    const routes = await Route
      .find({})
    return res.status(200).json({
      count: routes.length,
      data: routes
    })

  } catch (error) {
    res.status(500).json({
      errorType: "Server Error", 
      message: error.message 
    })
  }
})


routesRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const route = await Route.findById(id)
    if (!route) {
      return res.status(404).json({
        errorType: "No Route Found"
      })
    } 
    return res.status(200).json({ 
      message: "Route Found",
      data: route 
    })
    
  } catch (error) {
    res.status(500).json({
      errorType: "Server Error", 
      message: error.message 
    })
  }
})


routesRouter.post('/', async (req, res) => {
  const body = req.body

  try {
    if (!body.origin || !body.destination || !body.transportation) {
      return res.status(400).json({ 
        errorType: "Missing Inputs",
        message: "Send all required fields" 
      })
    }

    const route = new Route ({
      origin: body.origin,
      destination: body.destination,
      transportation: body.transportation,
      firstRoute: "LRT2 Recto to LRT2 Pureza",
    })

    const savedRoute = await route.save()
    return res.status(201).json({
      message: "Route created successfully",
      savedRoute
    })

  } catch (error) {
    res.status(500).json({
      errorType: "Server Error", 
      message: error.message
    })
  }
})


routesRouter.put('/:id', async (req, res) => {
  const body = req.body
  const { id } = req.params

  try {
    if (!body.origin || !body.destination || !body.transportation) {
      return res.status(400).json({
        errorType: "Missing Inputs", 
        message: "Send all required fields" 
      })
    }
    
    const route = {
      origin: body.origin,
      destination: body.destination,
      transportation: body.transportation,
      firstRoute: "LRT2 Recto to LRT2 Pureza",
    }

    Route.findByIdAndUpdate(id, route, { new: true })
      .then(updatedRoute => {
        return res.status(200).json({
          message: "Route updates successfully",
          updatedRoute
        })
      })
      .catch((error) => {
        console.log(error)
        return res.status(400).json({ 
          errorType: "Not Found",
          message: "Route not found" 
        })
      })

  } catch (error) {
    res.status(500).json({
      errorType: "Server Error", 
      message: error.message 
    })
  }
})


routesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const result = await Route.findByIdAndDelete(id)
    if (!result) {
      return res.status(404).json({ message: "Route not found" })
    }
    return res.status(200).send({ 
      message: "Route deleted successfully",
      result
    })

  } catch (error) {
    res.status(500).json({
      errorType: "Server Error",
      message: error.message 
    })
  }
})

export default routesRouter