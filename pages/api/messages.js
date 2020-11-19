import connectDb from '../../utils/connectDb.js'
import Message from '../../models/Message'
import User from '../../models/User'


connectDb()
export default async(req, res) => {
    const messages = await Message.find()


    var messagesArr = []


    // for (const message in messages) {
    //     console.log(message);
    //     // const user = await User.findOne({ _id: message.authorID });

    //     // message.authorID = user
    //     // messagesArr.push(message)
    //     break

    // }
    // console.log("Message length", messages.length);
    for (let index = 0; index < messages.length; index++) {
        const message = messages[index];
        const user = await User.findOne({ _id: message.authorID });
        message.authorID = user
        messagesArr.push(message)

    }



    res.status(200).send(messagesArr)
}