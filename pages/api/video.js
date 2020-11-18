import connectDb from '../../utils/connectDb.js'
import Video from '../../models/Video.js'

connectDb()
export default async(req, res) => {
    const video = await Video.findById(req.params.id)
    res.status(200).send(video)
}