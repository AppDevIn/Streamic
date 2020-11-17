import connectDb from '../../utils/connectDb.js'
import User from '../../models/User.js'
import bcrypt from 'bcrypt'


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

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(user)
        } else {
            res.status(422).send("Invaild authentication")

        }

    } catch (error) {
        console.log(error);
        res.status(500).send("User try again later")
    }


}