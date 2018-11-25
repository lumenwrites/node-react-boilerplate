import express from 'express'
import bodyParser from 'body-parser' // Parse requests, turn them into json
import morgan from 'morgan' // A logging framework, terminal output for debugging.
import cors from 'cors' // Cors allows requests from different domains
import path from 'path' // Manipulate filepaths

import './connectDB'

import profilesRoutes from './routes/profiles.js'
import { stripeWebhook } from './controllers/profiles.js'


/* Setup server */
const server = express()
server.set('view engine', 'ejs')
server.set('views', __dirname + '/views')
server.use(cors())
/* Stripe webhook must use bodyParser.raw() instead of .json()
   to validate signature correctly, so I put it before the rest of the routes */
server.post('/api/v1/profiles/stripe-webhook',
	    bodyParser.raw({type: '*/*'}),
	    stripeWebhook)
/* Parse received JSON, and put it into req.body */
server.use(bodyParser.json({ limit: '50mb' }))

/* Endpoints */
server.use('/api/v1/profiles', profilesRoutes)

/* Static files */
server.use("/img", express.static(path.resolve(__dirname, '../client/static/img')))
server.get('/client.js', (req,res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/client.js'))
})

server.use((req, res) =>
    res.sendFile(path.resolve(__dirname, '../client/index.html')))



/* Serve */
const port = process.env.PORT || 3031
server.listen(port, function () {
    console.log(`Running on port ${port}!`)
})
