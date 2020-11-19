import connectDb from '../../utils/connectDb.js'
import Room from '../../models/Room.js'
import Video from '../../models/Video.js'

connectDb()
export default async(req, res) => {

    switch (req.method) {
        case "GET":
            const type = req.query.type;
            if (type == '1') {
                await getAllRooms(req, res);
            } else {
                await handleGetRequest(req, res);
            }
            break;
            // case "POST":
            //     break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`)
            break;
    }
}

async function handleGetRequest(req, res) {
    const { _id } = req.query
    console.log("id", _id);
    const rooms = await Room.find({ memebers: _id })
    res.status(200).send(rooms)
}

async function getAllRooms(req, res) {
    const rooms = await Room.find()

    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].Playing != null) {
            const videoInfo = await Video.findById(rooms[i].Playing);
            rooms[i].Playing = videoInfo;
        }
    }
    res.status(200).send(rooms)
}