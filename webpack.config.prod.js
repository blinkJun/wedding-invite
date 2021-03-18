const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'production'

module.exports = merge(common, {
    mode:'production',
    module: {
        rules: [
            // 处理样式文件
            // css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader:'postcss-loader'
                        }
                    ],
                    publicPath:'../'
                })
            },
            // scss
            {
                test: /\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader:'postcss-loader'
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ],
                    publicPath:'../'
                })
            },
        ]
    },
    plugins:[
        // 独立css文件
        new ExtractTextPlugin('css/[name].[hash].css'),
        // 在脚本中定义变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        })
    ],
})