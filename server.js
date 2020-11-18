const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
require('dotenv').config();
const mongoose = require('mongoose')


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
    socket.on('joinRoom', (roomID, user) => {
        console.log(`${user._id} has joined the room`);
        socket.emit("message", "Welcome to Streamic.");
        socket.join(roomID);
    });

    socket.on('changes', (data) => {
        io.to("room1").emit('streaming', data);
    })


    socket.on('sendMessage', (data) => {
        const { message, roomID } = data
        io.to(roomID).emit('messageChanges', message);
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