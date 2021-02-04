import mongoose from 'mongoose'

const videoSchema = mongoose.Schema({
    videoURL: {
        type: String,
        default: "https://www.youtube.com/watch?v=VHJd6QwU91A&ab_channel=PlayStation"
    },
    videoName: {
        type: String,
        default: "PS5 Launch – New Worlds To Explore – Play Has No Limits"
    },
    thumbNail: {
        type: String,
        default: "https://i.ytimg.com/vi/VHJd6QwU91A/mqdefault.jpg"
    }
})

export default mongoose.models.Video || mongoose.model('Video', videoSchema)