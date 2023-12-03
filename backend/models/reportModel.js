import mongoose from 'mongoose'

const reportSchema = mongoose.Schema(
  {
    location: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  }
)

export const Report = mongoose.model('Report', reportSchema)