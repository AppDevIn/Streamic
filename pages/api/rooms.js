import connectDb from '../../utils/connectDb.js'
import Room from '../../models/Room.js'
import room from './room.js'

connectDb()
export default async(req, res) => {

    const { _id } = req.query
    console.log("id", _id);
    const rooms = await Room.find({ memebers: _id })
    res.status(200).send(rooms)
}