var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: "./demo/entre.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'demo.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: false,
        //     mangle: false
        // })
    ],
    module: {
        loaders: [
        	{ 
            	test: /\.less$/,
            	loader: "style-loader!css-loader!postcss-loader!less-loader"
            }, { 
            	test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            },	{ 
            	test: /\.js$/,
	            exclude: /(node_modules|bower_components)/,
            	loader: "babel" 
            }, {
	            test: /\.jsx?$/,
	            exclude: /(node_modules|bower_components)/,
	            loader: 'babel',
            }
        ],
        postcss: function () {
            return [autoprefixer, precss];
        }
    },
    
};