import mongoose from 'mongoose'

const routeSchema = mongoose.Schema(
  {
    origin: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    transportation: {
      type: String,
      required: true
    },
    firstRoute: {
      type: String
    },
    secondRoute: {
      type: String
    },
    thirdRoute: {
      type: String
    }
  }
)

export const Route = mongoose.model('Route', routeSchema)