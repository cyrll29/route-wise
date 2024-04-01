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

    // Google Maps Directions API
    const response = await client.directions({
      params: {
        origin: body.origin,
        destination: body.destination, 
        mode: 'transit',
        transit_routing_preference: 'fewer_transfers',
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
      gmapsResponse
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