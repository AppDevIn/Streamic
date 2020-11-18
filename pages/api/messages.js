import connectDb from '../../utils/connectDb.js'
import Message from '../../models/Message'

connectDb()
export default async(req, res) => {
    const rooms = await Message.find()
    res.status(200).send(rooms)
}