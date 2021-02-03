const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const baseUrl = process.env.NODE_ENV === "production" ?
    'https://p2streamic.herokuapp.com' :
    'http://localhost:3000';
const axios = require('axios').default;
require('dotenv').config();


const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.options('*', cors())

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Configuring body parser middleware
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use(bodyParser.json());

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({
    dev
})
const nextHandler = nextApp.getRequestHandler()


//Keep track of the users in each room
const users = {}

const socketToRoom = {};


io.on('connection', socket => {
    socket.on('joinRoom', ({roomID, user}) => {
        console.log(user);
        console.log(`${user._id} has joined the ${roomID}`);
        socket.emit("message", "Welcome to Streamic.");
        socket.join(roomID);



    });

    socket.on('changes', ({roomID, data}) => {
        io.to(roomID).emit('streaming', data);
        if (data.isVideoChanged) {
            // update the video playing for the room

            // TODO: pass in the thumbnail here
            // data["thumbnail"] = (FUNCTIONS API)
            // data["title"] = (FUNCTIONS API)
            async function updateRoomWatching() {
                const url = `${baseUrl}/api/room?type=1`
                const payload = {
                    roomID,
                    data
                }
                const response = await axios.post(url, payload)
            }

            updateRoomWatching();
        }
    });

    socket.on('router', (roomID) => {
        socket.broadcast.to(roomID).emit('existingUser');
    });

    socket.on('sendMessage', (data) => {
        const {message, roomID} = data
        console.log("Message reveived from " + roomID);
        io.to(roomID).emit('messageChanges', message);
    })

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', {
            signal: payload.signal,
            callerID: payload.callerID
        });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', {
            signal: payload.signal,
            id: socket.id
        });
    });

    socket.on("join room", roomID => {
        //Check if the room exist
        if (users[roomID]) {

            // const length = users[roomID].length;
            // if (length === 4) {
            //     socket.emit("room full");
            //     return;
            // }

            //Add the room
            users[roomID].push(socket.id);
        } else {
            //Create a new room object
            users[roomID] = [socket.id];
        }

        socketToRoom[socket.id] = roomID;

        //Get the users in the room
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        //Send all the exisitng to user details to clients
        console.log("Users");
        console.log(usersInThisRoom);
        socket.emit("all users", usersInThisRoom);

    });



    // Runs when client disconnects
    socket.on('disconnect', () => {
        console.log(`${socket.id} has left the room`);

        //For voice 
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
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
        if (err)
            throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})