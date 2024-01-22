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

    // --------- OTP ---------- //

    // OTP server URL and endpoint for a specific query
    // const otpServerUrl = 'http://localhost:8080/otp';
    // const otpEndpoint = '/routers/default/plan';

    // Example query parameters (modify based on your needs)
    // const queryParams = {
    //   fromPlace: '14.59772, 121.01144', // Example origin coordinates (latitude,longitude)
    //   toPlace: '14.64580, 121.00771',  // Example destination coordinates (latitude,longitude)
    //   date: '2024-01-22',
    //   time: '12:00:00',
    //   mode: 'TRANSIT', // Example modes (can be adjusted based on your requirements)
    //   maxWalkDistance: 1000, // Example maximum walking distance in meters
    //   numItineraries: 3,     // Example number of itineraries to retrieve
    // };

    // const otpResponse = await axios.get(`${otpServerUrl}${otpEndpoint}`, {
    //   params: queryParams,
    // });
    const otpResponse = await axios.get('http://localhost:8080/otp/routers/default/plan?fromPlace=14.597723678179953%2C121.01144221138274&toPlace=14.645796541227087%2C121.00771461620177&time=11%3A43am&date=01-22-2024&mode=TRANSIT%2CWALK&arriveBy=false&wheelchair=false&showIntermediateStops=true&locale=en')
    

    const cleanResponse = JSON.stringify(otpResponse.data, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (value === otpResponse.request) {
          return undefined; // Exclude circular reference
        }
      }
      return value;
    });

    // ------- END OTP --------- //

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
      cleanResponse
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