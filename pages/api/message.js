import Message from '../../models/Message'
import Room from '../../models/Room'
import mongoose from 'mongoose'
import connectDb from '../../utils/connectDb'

connectDb()
export default async(req, res) => {

    console.log("Post message");

    try {
        const { msg, user, roomID } = req.body

        const newMessage = await new Message({
            messageContent: msg,
            authorID: mongoose.Types.ObjectId(user._id),
            room: roomID
        })


        newMessage.save()


        res.status(200).json(newMessage)



    } catch (error) {
        res.status(404).json({ error: error })
        console.log("error", error);
    }


}