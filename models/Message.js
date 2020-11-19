import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

const { String, Date } = mongoose.Schema.Types

const messageSchema = mongoose.Schema({
    messageID: {
        type: String,
        default: shortid.generate()
    },
    messageContent: String,
    dateTime: {
        type: Date,
        default: moment().utc()
    },
    authorID: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    room: { type: String }
})



export default mongoose.models.Message || mongoose.model('Message', messageSchema)