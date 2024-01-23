import express from 'express'
import Route from '../models/routeModel.js'
import { Client } from '@googlemaps/google-maps-services-js'
import fs from 'fs'
import gql from 'graphql-tag'
import { request } from 'graphql-request'

const routesRouter = express.Router()

const client = new Client({});
const query = gql(fs.readFileSync('queries.graphql', 'utf8'));
const otpUrl = "http://localhost:8080/otp/routers/default/index/graphql"

routesRouter.post('/', async (req, res) => {
  const body = req.body
  try {
    if (!body.origin || !body.destination || !body.transportation) {
      return res.status(400).json({ 
        message: "Please provide values for all required fields: origin, destination, and transportation." 
      })
    }

    // --------- OTP ---------- //

    const variables = {
      fromLat: 14.645841240358383,
      fromLon: 121.00777324714129,
      toLat: 14.649954277487442,
      toLon: 121.0466559514089,
      date: "2023-02-15",
      time: "11:37"
    };

    // Use this query with your GraphQL client
    const otpResponse = await request(otpUrl, query, variables);


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
      otpResponse
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