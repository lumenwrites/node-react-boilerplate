import mongoose from 'mongoose' // ORM between mongo and node.

/* Keys */
import { DB_NAME, mongoDevUser, mongoDevPassword,
	 mongoProdUser, mongoProdPassword } from '../config/keys'

mongoose.Promise = global.Promise

const LOCAL = `mongodb://localhost:27017/${DB_NAME}`
const ATLAS_PROD = `mongodb://${mongoProdUser}:${mongoProdPassword}`
		 + `@writingstreak-shard-00-00-rkkui.mongodb.net:27017,`
		 + `writingstreak-shard-00-01-rkkui.mongodb.net:27017,`
		 + `writingstreak-shard-00-02-rkkui.mongodb.net:27017`
		 + `/${DB_NAME}`
		 + `?ssl=true&replicaSet=writingstreak-shard-0`
		 + `&authSource=admin` // &retryWrites=true
const isProd = process.env.NODE_ENV === "production"
const MONGO_DB_URL = process.env.MONGO_URL || (isProd ? ATLAS_PROD : LOCAL)
console.log("[server] Connecting to the db at " + MONGO_DB_URL)
mongoose.connect(MONGO_DB_URL, (error) => {
    if (error) { console.error("Can't connect to mongo."); throw error }
    console.log("Connected to the db", MONGO_DB_URL)
})

