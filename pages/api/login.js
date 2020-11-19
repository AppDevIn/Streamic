import connectDb from '../../utils/connectDb.js'
import User from '../../models/User.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"


connectDb()
export default async(req, res) => {

    const { email, password } = req.body

    console.log(email, password)
    try {

        //Encrpt the password 
        //1) Check if the user already exist
        const user = await User.findOne({ email: email })

        const isMath = await bcrypt.compare(password, user.password)
        console.log(isMath)
        if (isMath) {
            console.log(`Logging into ${email}`)

            const token = jwt.sign({ userId: user._id },
                process.env.JWT_SECRET, { expiresIn: "7d" })

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(token)
        } else {
            res.status(422).json({ message: "Email or password is invaild" })

        }

    } catch (error) {

        res.status(500).send("Please try to login again")
    }


}