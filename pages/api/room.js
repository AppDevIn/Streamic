import connectDb from '../../utils/connectDb.js'
import Room from '../../models/Room.js'
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
        const newRoom = await new Room({
            roomName: name,
            isTemporary: false,
            admins: mongoose.Types.ObjectId("5fb35ed0e7301e9e38f6028b")

        }).save()
        console.log({ newRoom });
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
    } catch (error) {
        console.log(error);
        res.status(500).send(" Room try again later")
    }
}


async function handleGetRequest(req, res) {
    const { roomID } = req.query;
    console.log("Querying", req.query);
    const room = await Room.findOne({ roomID });
    res.status(200).json(room)
}