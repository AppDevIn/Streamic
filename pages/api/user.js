import User from '../../models/User.js'
import connectDB from '../../utils/connectDb'
import mongoose from 'mongoose'


connectDB()
export default async(req, res) => {
    switch (req.method) {
        case "GET":
            await getUser(req, res);
            break;
        case "POST":
            await handlePostRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`)
            break;
    }
}


export async function getUser(req, res) {
    const { token } = req.query;
    console.log("token", token);
    const user = await User.findOne({ token });

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(user)

}