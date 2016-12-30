var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');



module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/components/app.js",

    output: {
        path: __dirname + '/build',
        filename: '[name]-[hash].js'
    },
    module: {
        loaders: [
            {
                 test: /\.js?$/, 
                 loaders: ['react-hot', 'babel'], 
                 exclude: /node_modules/ 
             },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader', 
                query: { presets: ['es2015', 'react'] } 
            },
            // { 
            //     test: /\.scss$/,  
            //     loader: ExtractTextPlugin.extract('style','css?modules&localIdentName=[path][name]__[local]!postcss!sass?sourceMap=true'),
            //     exclude: [/node_modules/,/scss/]
            // },
            // { 
            //     test: /\.scss$/, 
            //     loader: 'style!css!sass?sourceMap=true', 
            //     include: /scss/ 
            // },
            { 
                test: /\.scss$/, 
                loader: 'style!css!sass?sourceMap=true', 
                exclude: [/node_modules/]
            },
             {
              test: /\.css$/, // Only .css files
              loader: 'style!css' // Run both loaders
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                loader: 'url?limit=8192&name=./images/[name].[ext]'
            }
        ]
    },
    postcss: [autoprefixer({ browsers: ['> 5%', 'last 2 versions'] })],

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html"
        }),
        new ExtractTextPlugin("style-[contenthash].css", {
          allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist', 'build'], {
          root: __dirname,
          verbose: true, 
          dry: false
        })
    ],

    devServer: {
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};
