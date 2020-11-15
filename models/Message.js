import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    messageID: String,
    messageContent: String,
    dateTime: Date,
    authorID: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
})



export default mongoose.models.Message || mongoose.model('Message', messageSchema)