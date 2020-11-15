import mongoose from 'mongoose'
import shortid from 'shortid'

const userSchema = mongoose.Schema({
    UID: shortid.generate(),
    Email: String,
    Username: String,
    Photo: String,
})



export default mongoose.models.User || mongoose.model('User', userSchema)