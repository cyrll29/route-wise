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
      message: "Internal server error"
    })
  }
})


routesRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const route = await Route.findById(id)
    if (!route) {
      return res.status(404).json({
        message: "No Route Found"
      })
    } 
    return res.status(200).json({ 
      message: "Route Found",
    })
    
  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    })
  }
})


routesRouter.post('/', async (req, res) => {
  const body = req.body

  try {
    if (!body.origin || !body.destination || !body.transportation) {
      return res.status(400).json({ 
        message: "Please provide values for all required fields: origin, destination, and transportation." 
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
      data: [
        {
          id: 0,
          firstRoute: "LRT Balintawak to LRT Doroteo Jose",
          secondRoute: "LRT Recto to LRT Pureza",
          thirdRoute: "Walk to CEA"
        }
      ],
      message: "Route created successfully",
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    })
  }
})


routesRouter.put('/:id', async (req, res) => {
  const body = req.body
  const { id } = req.params

  try {
    if (!body.origin || !body.destination || !body.transportation) {
      return res.status(400).json({
        message: "Please provide values for all required fields: origin, destination, and transportation." 
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
        })
      })
      .catch((error) => {
        console.log(error)
        return res.status(400).json({ 
          message: "Route not found" 
        })
      })

  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    })
  }
})


routesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const result = await Route.findByIdAndDelete(id)
    if (!result) {
      return res.status(404).json({ 
        message: "Route not found" 
      })
    }
    return res.status(200).send({ 
      message: "Route deleted successfully",
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    })
  }
})

export default routesRouter