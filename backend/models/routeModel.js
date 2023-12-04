import mongoose from 'mongoose'

const routeSchema = new mongoose.Schema({
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
  }
})

routeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Route = mongoose.model('Route', routeSchema)