import connectDb from '../../utils/connectDb.js'
import Room from '../../models/Room.js'
import User from '../../models/User'
import mongoose from 'mongoose'


connectDb()
export default async(req, res) => {

    console.log(req.method);
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "POST":
            await handlePostRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`)
            break;
    }
}



async function handlePostRequest(req, res) {

    const { name } = req.body
    console.log(name);
    try {
        const user = await User.findOne({ token: req.cookies.token })
        const newRoom = await new Room({
            roomName: name,
            isTemporary: false,
            admins: mongoose.Types.ObjectId(user._id)

        }).save()
        console.log({ newRoom });


        const update = { $push: { rooms: mongoose.Types.ObjectId(newRoom._id) } };
        await user.updateOne(update);

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
    } catch (error) {
        console.log(error);
        res.status(500).send(" Room try again later")
    }
}


async function handleGetRequest(req, res) {
    const { roomID } = req.query;
    const room = await Room.findOne({ roomID });
    const user = await User.findOne({ token: req.cookies.token })

    const update = { $push: { rooms: mongoose.Types.ObjectId(room._id) } };
    await user.updateOne(update);

    res.status(200).json(room)
}