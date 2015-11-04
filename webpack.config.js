var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./main/entre.js",
    output: {
        path: "dist/",
        filename: "app.js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false
        }),
    ],
    module: {
        loaders: [
        	{ 
            	test: /\.less$/,
            	loader: "style!css!less" 
            }, { 
            	test: /\.css$/,
            	loader: "style!css" 
            },	{ 
            	test: /\.js$/,
	            exclude: /(node_modules|bower_components)/,
            	loader: "babel" 
            }, {
	            test: /\.jsx?$/,
	            exclude: /(node_modules|bower_components)/,
	            loader: 'babel',
                query: {
                    optional: ['runtime'],
                    stage: 0
                }
            }
        ]
    },
    
};