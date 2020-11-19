import connectDb from '../../utils/connectDb.js'
import Room from '../../models/Room.js'
import User from '../../models/User'
import mongoose from 'mongoose'


connectDb()
export default async (req, res) => {
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

    const { name, file } = req.body
    console.log(name);
    try {
        console.log("id", _id);
        const user = await User.findOne({ _id })

        const newRoom = await new Room({
            roomName: name,
            isTemporary: false,
            mediaUrl: file,
            admins: mongoose.Types.ObjectId(user._id),
            memebers: mongoose.Types.ObjectId(_id)

        }).save()
        console.log({ newRoom });

        const update = { $push: { rooms: mongoose.Types.ObjectId(newRoom._id) } };
        await user.updateOne(update);

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({})
    } catch (error) {
        console.log(error);
        res.status(500).send(" Room try again later")
    }
}


async function handleGetRequest(req, res) {
    const { roomID, _id } = req.query;
    console.log("room", roomID);
    console.log("room", _id);
    const room = await Room.findOne({ roomID });
    const user = await User.findOne({ _id })

    const update = { $push: { rooms: mongoose.Types.ObjectId(room._id) } };
    await user.updateOne(update);

    const updateRoom = { $push: { memebers: mongoose.Types.ObjectId(user._id) } };
    await room.updateOne(updateRoom);

    console.log("user", user);



    res.status(200).json(room)
}