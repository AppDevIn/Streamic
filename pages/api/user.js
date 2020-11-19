import User from '../../models/User'
import connectDB from '../../utils/connectDb'
import mongoose from 'mongoose'
import jwt from "jsonwebtoken"

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

    if (!("authorization" in req.headers)) {
        res.status(401).send("No authorization token")
    } else {


        try {
            const { userId } = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
            const user = await User.findOne({ _id: userId });


            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).send("user not found")
            }
        } catch {
            res.status(403).send("Invaiold token")
        }
    }

}