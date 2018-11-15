import express from 'express'
import bodyParser from 'body-parser' // Parse requests, turn them into json
import morgan from 'morgan' // A logging framework, terminal output for debugging.
import mongoose from 'mongoose' // ORM between mongo and node.
import cors from 'cors' // Cors allows requests from different domains
import path from 'path' // Manipulate filepaths

/* Setup server */
const server = express()
server.set('view engine', 'ejs')
server.set('views', __dirname + '/views')
server.use(cors())
/* parse received json, and put it into req.body */
server.use(bodyParser.json({ limit: '50mb' }))


server.get('/client.js', (req,res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/client.js'));
})


/* server.use(express.static('../client/dist')) */

server.use((req, res) =>
    res.sendFile(path.resolve(__dirname, '../client/index.html')));

/* Serve */
const port = process.env.PORT || 3030
server.listen(port, function () {
    console.log(`Running on port ${port}!`)
})
