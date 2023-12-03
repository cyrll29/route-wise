import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { PORT, mongoDBURL } from './config.js'
import routesRoute from './controllers/routes.js'
import reportsRoute from './controllers/reports.js'

const app = express()

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS Policy
app.use(cors())

app.get('/', (request, response) => {
  response.status(234).send("Welcome to RouteWise Backend")
})

app.use('/routes', routesRoute)
app.use('/reports', reportsRoute)

mongoose.connect(mongoDBURL)
  .then(() => {
    console.log("connected to mongodb database")
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`)
    })
  })
  .catch ((error) => {
    console.log(error)
  })


