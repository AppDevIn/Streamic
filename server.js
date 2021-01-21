const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const baseUrl = process.env.NODE_ENV === "production" ?
    'https://p2streamic.herokuapp.com' :
    'http://localhost:3000';
const axios = require('axios').default;
require('dotenv').config();


// const bodyParser = require('body-parser');
// const cors = require('cors');

// app.use(cors());

// // Configuring body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// import register from './pages/api/register'


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()


io.on('connection', socket => {
    socket.on('joinRoom', ({ roomID, user }) => {
        console.log(user);
        console.log(`${user._id} has joined the ${roomID}`);
        socket.emit("message", "Welcome to Streamic.");
        socket.join(roomID);
    });

    socket.on('changes', ({ roomID, data }) => {
        io.to(roomID).emit('streaming', data);
        if (data.isVideoChanged) {
            // update the video playing for the room
            async function updateRoomWatching() {
                const url = `${baseUrl}/api/room?type=1`
                const payload = { roomID, data }
                const response = await axios.post(url, payload)
            }

            updateRoomWatching();
        }
    });

    socket.on('router', (roomID) => {
        socket.broadcast.to(roomID).emit('existingUser');
    });

    socket.on('sendMessage', (data) => {
        const { message, roomID } = data
        console.log("Message reveived from " + roomID);
        io.to(roomID).emit('messageChanges', message);
    })

    //Join the call after connecting to the room
    socket.on("callUser", (data) => {
        console.log("Calling user " + data.roomID);
        io.to(data.roomID).emit('hey', { signal: data.signalData });
    })

    socket.on("acceptCall", (data) => {
        console.log("Calling accpeted " + data.roomID);
        io.to(data.roomID).emit('callAccepted', data.signal);
    })


    // Runs when client disconnects
    socket.on('disconnect', () => {
        console.log(`${socket.id} has left the room`);
    });

});

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    app.post('*', async(req, res) => {
            return await nextHandler(req, res)
        })
        // app.post("/api/register", (req, res) => {
        //     register(req, res)
        // })


    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})