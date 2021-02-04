const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const baseUrl = process.env.NODE_ENV === "production" ?
    'https://p2streamic.herokuapp.com' :
    'http://localhost:3000';
const axios = require('axios').default;
require('dotenv').config();
var Webcam = require("node-webcam");



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
const inRoom = {}

const muted = {}

const socketToRoom = {};
const userToRoom = {};
const socketToUser = {};




io.on('connection', socket => {
    socket.on('joinRoom', ({ roomID, user }) => {
        console.log(user);
        console.log(`${user._id} has joined the ${roomID}`);
        socket.emit("message", "Welcome to Streamic.");
        socket.join(roomID);

        userToRoom[user._id] = true
        socketToUser[socket.id] = user._id




    });





    socket.on("usersToRoom", (user) => {

        console.log("id of user " + user);
        let room = userToRoom[user]
        console.log("retrieve the room " + room);

        io.to(socket.id).emit("retrieve usersToRoom", userToRoom[user])

    })

    socket.on('changes', ({ roomID, data }) => {
        io.to(roomID).emit('streaming', data);
        if (data.isVideoChanged) {
            // update the video playing for the room

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

    socket.on('resetURLs', ({ roomID, url, info, update }) => {
        async function resetURL() {
            const request_url = `${baseUrl}/api/room?type=2`
            const payload = {
                roomID,
                url,
                info
            }
            const response = await axios.post(request_url, payload)
        }

        resetURL()

        const data = {}
        data["resetQueue"] = true
        data["url"] = url
        data["update"] = true

        io.to(roomID).emit('streaming', data)
    })

    socket.on('sendMessage', (data) => {
        const { message, roomID } = data
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


    socket.on("get member", (roomID) => {
        io.to(roomID).emit("memeber join", inRoom[roomID])
    });

    socket.on("memeber add", ({ roomID, user }) => {

        if (inRoom[roomID]) {

            try {
                //Add the room
                inRoom[roomID].push({
                    ...user,
                    sid: socket.id
                });
                console.log(`User ${user.username}`);

            } catch (error) {
                console.log("Error getting the user", error);
            }


        } else {

            try {
                //Create a new room object
                inRoom[roomID] = [user];


            } catch (error) {
                console.log("Error getting the user", error);
            }

        }




        console.log(`Member in the room: ${inRoom[roomID]}`);



    });



    socket.on("mute user", ({ roomID }) => {

        //Check if the room exist
        if (muted[roomID]) {

            //Add the room
            muted[roomID].push(socket.id);
        } else {
            //Create a new room object
            muted[roomID] = [socket.id];
        }

        io.to(roomID).emit("muted user", muted[roomID])

    });


    socket.on("unmute user", ({ roomID }) => {
        console.log("Unmuting the " + socket.id);

        console.log(muted[roomID]);
        muted[roomID] = (muted[roomID]).filter(m => m !== socket.id)
        io.to(roomID).emit("muted user", muted[roomID])

    });


    // socket.on("get mute user", ({ roomID }) => {
    //     io.to(roomID).emit("muted user", muted[roomID])
    // });



    socket.on("join room", ({ roomID, user }) => {
        //Check if the room exist
        if (users[roomID]) {

            //Add the room
            users[roomID].push(socket.id);
        } else {
            //Create a new room object
            users[roomID] = [socket.id];
        }

        socketToRoom[socket.id] = roomID;

        //Get the users in the room
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        console.log(`Users in the room: ${usersInThisRoom}`);


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

        let rooms = inRoom[roomID];
        if (rooms) {
            rooms = rooms.filter(user => user.sid !== socket.id);
            inRoom[roomID] = rooms;
        }

        let mute = muted[roomID];
        if (mute) {
            mute = mute.filter(m => m !== socket.id);
            inRoom[roomID] = mute;
        }



        let uid = socketToUser[socket.id]
        console.log("🚀 ~ file: server.js ~ line 239 ~ socket.on ~ socketToUser", socketToUser)
        if (uid) {
            if (userToRoom[uid]) {
                userToRoom[uid] = false
            }
        }

        io.to(roomID).emit("remove socket", socket.id)




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