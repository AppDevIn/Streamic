import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    UID: String,
    Email : String,
    Username : String,
    Photo : String,
})

const user = mongoose.model('user' , userSchema)

export default user