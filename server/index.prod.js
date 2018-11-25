/* Make the variables.env available in our application */
require('dotenv').config({ path: '../config/variables.prod.env'})
/* In production, serve the webpacked server file. */
console.log('Production mode, running ./dist/server.build.js')
require('./dist/server.build.js')
