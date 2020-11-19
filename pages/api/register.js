import connectDb from '../../utils/connectDb.js'
import User from '../../models/User.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"


connectDb()
export default async(req, res) => {

    const { name, email, password } = req.body
    console.log("Register API");


    try {
        //1) Check if the user already exist
        const user = await User.findOne({ email: email })

        if (user) {
            console.log(`User already exist with ${email}`)
            res.status(422).json({ message: `User already exist with ${email}` })
            return
        }
        //2) --if not has their password
        const hash = await bcrypt.hash(password, 10)

        try {
            //3) Create user 
            const newUser = await new User({
                username: name,
                email,
                password: hash,
                token: "token"
            })

            //4) Create a token for the new user 
            const token = jwt.sign({ userId: newUser._id },
                process.env.JWT_SECRET, { expiresIn: "7d" })


            //Update the token into the database
            newUser.token = token

            newUser.save()
            console.log({ newUser });

            //5) Send back the token
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(token)
        } catch (error) {
            res.status(422).json({ message: "User not created" })
        }






    } catch (error) {
        console.log(error);
        res.status(500).send("User try again later")
    }


}