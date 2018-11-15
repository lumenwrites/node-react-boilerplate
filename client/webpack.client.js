const path = require('path')
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

const isProd = process.env.NODE_ENV === "production"

function getPlugins() {
    const plugins = []
    if (isProd) {
	/* Makes React tools development warning go away */
        plugins.push(new webpack.DefinePlugin({
	    'process.env': {
		NODE_ENV: JSON.stringify('production')
	    }
	}))
    }

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
