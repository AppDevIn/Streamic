import mongoose from 'mongoose'
import shortid from 'shortid'

const {String, Boolean} = mongoose.Schema.Types

const roomSchema = mongoose.Schema({
    roomID: {
        type: String,
        default: shortid.generate
    },
    roomName: String,
    isTemporary: Boolean,
    playingIndex: {
        type: Number,
        default: 0
    },
    mediaUrl: {
        type: String,
        default: "https://react.semantic-ui.com/images/avatar/large/matthew.png"
    },
    admins: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    }],
    memebers: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    }],
    Messages: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: "Message"
    }],
    Playing: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: "Video"
    }],
    Watchers: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    }],
})



export default mongoose.models.Room || mongoose.model('Room', roomSchema)