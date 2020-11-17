import mongoose from 'mongoose'

const { String, Boolean } = mongoose.Schema.Types

const roomSchema = mongoose.Schema({
    roomID: String,
    roomName: String,
    isTemporary: Boolean,
    mediaUrl: {
        type: String,
        default: "<Defaulf linl>"
    },
    admins: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    Messages: [{ type: mongoose.Schema.Types.ObjectID, ref: "Message" }],
    Playing: { type: mongoose.Schema.Types.ObjectID, ref: "Video" },
    Watchers: [{ type: mongoose.Schema.Types.ObjectID, ref: "User" }],
})



export default mongoose.models.Room || mongoose.model('Room', roomSchema)