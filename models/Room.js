import mongoose from 'mongoose'

const roomSchema = mongoose.Schema({
    roomID: String,
    roomName: String,
    isTemporary: Boolean,
    members: [{ type: mongoose.Schema.Types.ObjectID, ref: "User" }],
    admins: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    Messages: [{ type: mongoose.Schema.Types.ObjectID, ref: "Message" }],
    Playing: { type: mongoose.Schema.Types.ObjectID, ref: "Video" },
    Watchers: [{ type: mongoose.Schema.Types.ObjectID, ref: "User" }],
})



export default mongoose.models.Room || mongoose.model('Room', roomSchema)