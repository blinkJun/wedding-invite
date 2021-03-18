const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const webpack = require('webpack');

const os=require('os');
let iptable={},ifaces=os.networkInterfaces();
for (var dev in ifaces) {
  ifaces[dev].forEach(function(details,alias){
    if (details.family=='IPv4') {
      iptable[dev+(alias?':'+alias:'')]=details.address;
    }
  });
}
const locationIp = Object.values(iptable)[0]


// 页面配置
const {
    pagesDirPath
} = require('./views.config.js'); 


module.exports = merge(common, {
    mode:'development',
    devtool: 'inline-source-map',
    output:{
        path: __dirname + '/dev'
    },
    devServer:{
        // 告诉服务器从哪里提供内容,默认情况下，将使用当前工作目录作为提供内容的目录，但是你可以修改为其他目录：
        contentBase: pagesDirPath,
        hot: true,
        host: locationIp ,
        watchContentBase: true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // 在脚本中定义变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module:{
        rules:[
            // scss 处理和通用配置混合后会导致重复混合，发生打包错误
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader:'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
        ]
    }
})