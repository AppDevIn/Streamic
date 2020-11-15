lqimport mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    messageID: String,
    messageContent : String,
    dateTime : Date,
    authorID : {type:mongoose.Schema.Types.ObjectID,ref:"User"},
})

const message = mongoose.model('message' , messageSchema)

export default message
