import mongoose from 'mongoose'
import shortid from 'shortid'

const { String } = mongoose.Schema.Types

const userSchema = mongoose.Schema({
    UID: {
        type: String,
        unique: true,
        default: shortid.generate()
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    rooms: {
        type: [{ type: mongoose.Schema.Types.ObjectID, ref: "rooms" }]
    }
})



export default mongoose.models.User || mongoose.model('User', userSchema)