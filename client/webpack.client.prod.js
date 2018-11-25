const path = require('path')
const webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var dotenv = require('dotenv')

function getPlugins() {
    const plugins = []
    /*Parse environment vars(they have to be compiled by webpack to work on client)*/
    const env = dotenv.config({ path: '../config/variables.prod.env'}).parsed
    /* Turn them into a nice object */
    const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	return prev;
    }, {});
    plugins.push(new webpack.DefinePlugin(envKeys))
    
    return plugins
}

module.exports = {
    /* Tell webpack the root file of our app */
    entry: './index.js',

    /* Tell webpack to put output file into ./build/server.js. */
    output: {
	path: path.resolve(__dirname, 'dist'),
	filename: 'client.js'
    },
    module: {
	rules: [
	    {
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
		    loader: "babel-loader",
		    options: {
			presets: ["@babel/env", "@babel/react"],
			plugins: [
			    /* To enable state = {} */
			    "@babel/plugin-proposal-class-properties",
			    /* Readable styled components class names in devtools */
			    ["babel-plugin-styled-components", {
				"displayName": true
			    }]
			]
		    },
		}
	    }
	]
    },
    plugins: getPlugins()
}
