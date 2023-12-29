import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
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
      type: Object,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  }
)

reportSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Report = mongoose.model('Report', reportSchema)

Report.collection.createIndex( { createdAt: 1}, { expireAfterSeconds: 60 * 60 * 6 } )

export default Report