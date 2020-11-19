import connectDb from '../../utils/connectDb.js'
import Room from '../../models/Room.js'
import Video from '../../models/Video.js'

connectDb()
export default async(req, res) => {

    const { _id } = req.query

    const rooms = await Room.find({ memebers: _id })

    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].Playing != null) {
            const videoInfo = await Video.findById(rooms[i].Playing);
            rooms[i].Playing = videoInfo;
        }
    }
    res.status(200).send(rooms)
}