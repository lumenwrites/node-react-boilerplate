/* Make the variables.env available in our application */
require('dotenv').config({ path: '../config/variables.dev.env'})
/* Babel polyfill to convert ES6 code in runtime */
require('@babel/register')({
    "presets": ["@babel/preset-env"],
})

require('@babel/polyfill') // For async/await
require('./server.js')

