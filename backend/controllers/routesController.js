import express from 'express'
import Route from '../models/routeModel.js'
import { Client } from '@googlemaps/google-maps-services-js'
import axios from 'axios'
const routesRouter = express.Router()

const client = new Client({});

routesRouter.post('/', async (req, res) => {
  const body = req.body

  try {
    if (!body.origin || !body.destination || !body.transportation) {
      return res.status(400).json({ 
        message: "Please provide values for all required fields: origin, destination, and transportation." 
      })
    }

    // Distance Matrix
    // const apiKey = 'AIzaSyD2e6HZRkqhtf_VtAFeoCmETc0JQXbkdzM';
    // const deliveryAddress = 'place_id:ChIJ8cYrcse3lzMRLmWd0Z7Ph9w';
    // const vendorAddress = 'place_id:ChIJJfn1VGC2lzMRtNhYkEkNokM'

    const reqData = {
      origin: {
        "placeId": body.origin,
      },
      destination: {
        "placeId": body.destination,
      },
      travelMode: 'TRANSIT',
      transitPreferences: {
        "routingPreference": "LESS_WALKING"
      },
      computeAlternativeRoutes: true
    };

    const apiUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes'

    const responseRoute = await axios.post(apiUrl, reqData, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-FieldMask": "routes.legs,routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        "X-Goog-Api-Key": 'AIzaSyD2e6HZRkqhtf_VtAFeoCmETc0JQXbkdzM'
      },
    })

    console.log(responseRoute.data)
    const responseRouteData = responseRoute.data




    // Make a request to the Directions API using the client
    const response = await client.directions({
      params: {
        origin: `place_id:${body.origin}`,
        destination: `place_id:${body.destination}`,
        mode: 'transit',
        // transit_routing_preference: 'less_walking',
        // optimize: true,
        alternatives: true,
        key: process.env.REACT_APP_API_KEY
      },
    });

    // Get the data from the response
    const data = response.data;

    const route = new Route ({
      origin: body.origin,
      destination: body.destination,
      transportation: body.transportation
    })

    console.log(route)

    const savedRoute = await route.save()
    return res.status(201).json({
      data,
      message: "Route created successfully",
      responseRouteData
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error"
    })
  }
})


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