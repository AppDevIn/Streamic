import mongoose from 'mongoose'

const videoSchema = mongoose.Schema({
    videoID: String,
    videoName: String,
    thumbNail: String,
    sourceType: String,
})

export default mongoose.models.Video || mongoose.model('Video', videoSchema)