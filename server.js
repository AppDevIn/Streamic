const app = require('express')()
const server = require('http').Server(app)
const next = require('next')
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