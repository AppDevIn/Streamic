import connectDb from '../../utils/connectDb.js'
import Room from '../../models/Room.js'

connectDb()
export default async(req, res) => {

    const { name } = req.body
    console.log(name);


    try {
        //1) Check if the user already exist
        const room = await Room.findOne({ name: name })
        if (room) {
            console.log(`Room already exist with ${name}`)
            res.status(422).send(`Room already exist with ${name}`)
            return
        }
        //2) Create room 
        const newRoom = await new Room({
            roomName: name,
        }).save()
        console.log({ newRoom });
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
    } catch (error) {
        console.log(error);
        res.status(500).send(" Room try again later")
    }


}