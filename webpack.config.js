var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry : __dirname + '/src/app.js',
    module : {
        rules : [
            {
                test : /\.js$/,
                include : __dirname + '/src',
                exclude : /node_modules/,
                loader : 'babel-loader'
            },
            {
				test: /\.s?css$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
        ]
    },
    output : {
        filename : 'bundle.js',
        path : path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin,
        new webpack.DefinePlugin({
                 'process.env.NODE_ENV': '"production"'
        })
    ]
}