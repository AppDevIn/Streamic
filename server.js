const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()


io.on('connection', socket => {
    socket.on('joinRoom', () => {
        console.log(`${socket.id} has joined the room`);
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        console.log(`${socket.id} has left the room`);
    });

});


nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})