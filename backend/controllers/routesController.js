import express from 'express'
import Route from '../models/routeModel.js'
import { request } from 'graphql-request'
import sendRoutesEmail from '../utils/sendRoutesEmail.js'
import { Client } from '@googlemaps/google-maps-services-js'
import config from '../utils/config.js'
import axios from 'axios'

const routesRouter = express.Router()
const client = new Client({});


routesRouter.post('/', async (req, res) => {
  const body = req.body
  try {
    if (!body.origin || !body.destination) {
      return res.status(400).json({ 
        message: "Please provide values for all required fields: origin and destination," 
      })
    }

    // const reqData = {
    //   origin: {
    //     "placeId": "ChIJJfn1VGC2lzMRtNhYkEkNokM",
    //   },
    //   destination: {
    //     "placeId": "ChIJB8roEL-3lzMRZbX34r2dHWU",
    //   },
    //   travelMode: 'TRANSIT',
    //   transitPreferences: {
    //     "routingPreference": "LESS_WALKING"
    //   },
    //   computeAlternativeRoutes: true
    // };

    // const apiUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes'

    // const responseRoute = await axios.post(apiUrl, reqData, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-Goog-FieldMask": "routes.legs,routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
    //     "X-Goog-Api-Key": 'AIzaSyBDu1a3qe9mCzfAePw7qv7B4_LGESs5jIQ'
    //   },
    // })

    // const responseRouteData = responseRoute.data

    // Google Maps Directions API
    const response = await client.directions({
      params: {
        origin: body.origin,
        destination: body.destination, 
        mode: 'transit',
        // transit_routing_preference: 'less_walking',
        alternatives: true,
        key: process.env.REACT_APP_API_KEY
      },
    });

    const gmapsResponse = response.data

    new Route ({
      origin: body.origin,
      destination: body.destination
    }).save()

    return res.status(201).json({
      message: "Route created successfully",
      gmapsResponse,
      responseRouteData
    })

  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: "Internal server error"
    })
  }
})

routesRouter.post('/sendemail', async (req, res) => {
  const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const { email, details } = req.body

  try {
    if (!emailValidation.test(email)) {
      return res.status(400).json({
        message: "Invalid Email"
      })
    }

    await sendRoutesEmail(
      email,
      details.origin,
      details.destination,
      details.duration,
      details.legs,
    )

    res.status(200).json({
      message: "Route details sent to your email"
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    })
  }
})

routesRouter.post('/sendsms', async (req, res) => {
  const { phoneNumber, details } = req.body
  console.log(phoneNumber)
  console.log(typeof phoneNumber)
  try {
    client.messages
      .create({
        body: "Hey from twilio",
        messagingServiceSid: "MG529e2428d82333e3ffad801218ea7a38",
        from: '+16416663715',
        to: `${phoneNumber}`
      })
      .then((message) => {
        console.log(message)
        res.status(200).json({
          message: "Route details sent to your number"
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          message: "Internal server error"
        })
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