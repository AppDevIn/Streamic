import connectDb from '../../utils/connectDb.js'
import Room from '../../models/Room.js'

connectDb()
export default async(req, res) => {
    const rooms = await Room.find()
    res.status(200).send(rooms)
}