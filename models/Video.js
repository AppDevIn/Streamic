import mongoose from 'mongoose'

const videoSchema = mongoose.Schema({
    videoID: String,
    videoName: String,
    thumbNail: String,
    sourceType: String,
})

const video = mongoose.model('video' , videoSchema)

export default video