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
            const type = req.query.type
            if(type == '1'){ 
                await updatePassword(req,res);
            }
            else if (type == '2'){
                await updateProfilePic(req,res);
            }else{ 
                await handlePostRequest(req, res);
            }
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

async function updatePassword(req, res) {
    const {userID,password } = req.body

    const user = await User.findOne({
        UID: userID
    });

    const update = {
        $set: {
            password : password
        }
    }

    await user.updateOne(update)
}

async function updateProfilePic(req, res) {
    const {userID , portfolioPic} = req.body

    const user = await User.findOne({
        userID: userID
    });

    const update = {
        $set: {
            photo : portfolioPic
        }
    }

    await user.updateOne(update)
}