/* Make the variables.env available in our application */
require('dotenv').config({ path: '../variables.env'})

/* Entry Script */
if (process.env.NODE_ENV === 'production') {
    /* In production, serve the webpacked server file. */
    console.log('Production mode, running ./dist/server.build.js')
    require('./dist/server.build.js')
} else {
    /* Babel polyfill to convert ES6 code in runtime */
    require('@babel/register')({
	"presets": ["@babel/preset-env"],
    })
    
    require('@babel/polyfill') // For async/await
    require('./server.js')
}
