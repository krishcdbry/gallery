var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry : __dirname + '/demo/src/app.js',
    module : {
        rules : [
            {
                test : /\.js$/,
                include : __dirname + '/demo/src',
                exclude : /node_modules/,
                loader : 'babel-loader'
            },
            {
                test : /\.css$/,
                use : [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options : {
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },
    output : {
        filename : 'bundle.js',
        path : path.resolve(__dirname, 'demo/dist')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin
    ]
}