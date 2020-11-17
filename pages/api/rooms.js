import Room from '../../models/Room'
import connectDb from '../../utils/connectDb'


connectDb();
export default async(req, res) => {
    const rooms = await Room.find()
    res.status(200).send(rooms)
}