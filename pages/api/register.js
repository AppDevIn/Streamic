import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"


connectDb()
export default async(req, res) => {

    const { name, email, password } = req.body

    try {
        //1) Check if the user already exist
        const user = User.findOne({ email })
        if (user) {
            res.status(422).send(`User already exist with ${email}`)
        }
        //2) --if not has their password
        const hash = await bcrypt.hash(password, 10)
            //3) Create user 
        const newUser = await new User({
            username: name,
            email,
            password: hash
        }).save()
        console.log({ newUser });
        //4) Create a token for the new user 
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
            //5) Send back the token
        res.status(201).json(token)


    } catch (error) {

    }
}