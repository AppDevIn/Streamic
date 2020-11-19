import User from '../../models/User'
import connectDB from '../../utils/connectDb'


connectDB()
export default async(req, res) => {

    const { _id } = req.query

    const user = await User.findOne({ _id });
    console.log(_id);


    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(user)

}