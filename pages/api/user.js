import mongoose from 'mongoose'
import jwt from "jsonwebtoken"
import User from '../../models/User'
import connectDB from '../../utils/connectDb'


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

async function updateProfilePic(req, res) {
    const {userID , photo} = req.body
    console.log(userID, photo)

    const user = await User.findOne({
        UID: userID
    });
    
    console.log(user)

    const update = {
        $set: {
            "photo" : photo
        }
    }

    const success = await user.updateOne(update)
    if(success){ 
        res.status(200).json(user)
    }else{
        res.status(404).json("user cannot be updated")
    }
    
}