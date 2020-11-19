import mongoose from 'mongoose'

const videoSchema = mongoose.Schema({
    videoID: {
        type: String,
        default: "VHJd6QwU91A"
    },
    videoName: {
        type: String,
        default: "PS5 Launch – New Worlds To Explore – Play Has No Limits"
    },
    thumbNail: {
        type: String,
        default: "https://i.ytimg.com/vi/VHJd6QwU91A/mqdefault.jpg"
    },
    sourceType: {
        type: String,
        default: "Youtube"
    }
})

export default mongoose.models.Video || mongoose.model('Video', videoSchema)