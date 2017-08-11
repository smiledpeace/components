const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const loaders = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
        query: {
            presets: ['es2015']
        }
    },
    {
        test: /\.css$/,
        loader: 'css-loader?minimize!less-loader',
    },
    {
        test: /\.less/,
        loader: 'css-loader?minimize!less-loader',
    },
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: {
        //     loaders: {
        //         less: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?minimize!less-loader'}),
        //     },
        // }
    },
];
module.exports = {
    entry: __dirname + '/public/main.js',
    output: {
        path: __dirname + '/public/dist',
        filename: 'build.js'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    module: {
        loaders: loaders
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // new ExtractTextPlugin("style.css"),
        // new webpack.LoaderOptionsPlugin({
        //     debug: false,
        //     options: {
        //         postcss: [
        //             autoprefixer()
        //         ],
        //     },
        // })
    ],
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        colors: false,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true, //实时刷新
    },
    watch: true

};