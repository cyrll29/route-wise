import config from './utils/config.js'
import express from 'express'
const app = express()
import cors from 'cors'
import mongoose from 'mongoose'

import routesRoute from './controllers/routes.js'
import reportsRoute from './controllers/reports.js'
import middleware from './utils/middleware.js'

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB database")
  })
  .catch ((error) => {
    console.log("Error connecting to MongoDB: ", error)
  })

app.use(cors())
// app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/routes', routesRoute)
app.use('/api/reports', reportsRoute)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app