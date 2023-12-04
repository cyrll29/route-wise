import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: /^[a-zA-Z0-9_]{3,16}$/, 
    //   message: "Usernames must be 6 to 12 characters long and contain only alphanumeric characters and underscores (_)."
    // },
  },
  name: String,
  passwordHash: String,
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

export default User