import connectDb from '../../utils/connectDb.js'
import Room from '../../models/Room.js'
import User from '../../models/User'
import mongoose from 'mongoose'
import Video from '../../models/Video'

connectDb()
export default async(req, res) => {

    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "POST":
            const type = req.query.type;
            if (type == '1') {
                await updateRoomWatching(req, res);
            } else {
                await handlePostRequest(req, res);
            }
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
            admins: mongoose.Types.ObjectId(user._id),
            Playing: mongoose.Types.ObjectId("5fb49a75acb6446fbc182927"),
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

async function updateRoomWatching(req, res) {
    const { roomID, data } = req.body;
    const videoID = data.id;

    const room = await Room.findOne({ roomID: roomID });
    const video = await Video.findOne({ videoID: videoID });

    if (video == null) {
        const newVideo = await new Video({
            videoID: data.id,
            videoName: data.title,
            thumbnail: data.thumbnail
        }).save()

        const update = { $set: { Playing: mongoose.Types.ObjectId(newVideo._id) } };
        await room.updateOne(update);
    } else {
        const update = { $set: { Playing: mongoose.Types.ObjectId(video._id) } };
        await room.updateOne(update);
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({})
}


async function handleGetRequest(req, res) {
    const { roomID, _id } = req.query;
    console.log("room", roomID);
    console.log("room", _id);
    const room = await Room.findOne({ roomID });
    const user = await User.findOne({ _id })

    if (room.Playing != null) {
        const videoInfo = await Video.findById(room.Playing);
        room.Playing = videoInfo;
    }

    const update = { $push: { rooms: mongoose.Types.ObjectId(room._id) } };
    await user.updateOne(update);

    const updateRoom = { $push: { memebers: mongoose.Types.ObjectId(user._id) } };
    await room.updateOne(updateRoom);

    console.log("user", user);



    res.status(200).json(room)
}