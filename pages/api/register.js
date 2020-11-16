import connectDb from '../../utils/connectDb'
import User from '../../models/User'


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

        //3) Create user 
        //4) Create a token for the new user 
        //5) Send back the token

    } catch (error) {

    }
}