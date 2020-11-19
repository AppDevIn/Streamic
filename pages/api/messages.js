import connectDb from '../../utils/connectDb.js'
import Message from '../../models/Message'
import User from '../../models/User'


connectDb()
export default async(req, res) => {

    const { roomID } = req.query

    console.log("Room ID", roomID);
    const messages = await Message.find({ room: roomID })


    var messagesArr = []

    for (let index = 0; index < messages.length; index++) {
        const message = messages[index];
        const user = await User.findOne({ _id: message.authorID });
        message.authorID = user
        messagesArr.push(message)

    }



    res.status(200).send(messagesArr)
}