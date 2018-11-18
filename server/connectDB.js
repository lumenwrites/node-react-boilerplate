import mongoose from 'mongoose' // ORM between mongo and node.
mongoose.Promise = global.Promise

mongoose.connect(process.env.LOCAL_DB, (error) => {
    if (error) { console.error("Can't connect to mongo."); throw error }
    console.log("Connected to the db", process.env.LOCAL_DB)
})
