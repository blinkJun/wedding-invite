const path = require("path")

module.exports = {
    // 存放页面的文件夹路径
    pagesDirPath:path.resolve( __dirname, "./src/views" ),
    // 基础精灵图配置，更多相关配置可查看gulpfile.js
    sprites:{
        entry:path.resolve( __dirname, "./src/sprites/" ),
        outPut:{
            image:path.resolve( __dirname, './src/images' ),
            scss:path.resolve( __dirname, './src/style' ),
        },
        template:path.resolve( __dirname, './scss.template.mustache' ),
        // css-loader默认把url给修改为相对路径，加上~防止别名被转换
        baseImagesPath:'~@/images/'
    },
    // 压缩图片配置 (建议打包成功后根据情况压缩图片，此配置为模拟网页https://tinypng.com/中的上传压缩，速度跟网络有关)
    minImages:{
        entry:['*.png','*.jpg','*.jpeg','*.gif'].map(item=>path.resolve( __dirname, `./dist/img/**/${item}` )),
        outPut:path.resolve( __dirname, "./dist/img/" )
    },
    // 需要分别打包的第三方包
    cachePackages:['axios'],
    // 默认htmlWebpackPlugin配置
    baseHtmlWebpackPluginOptions:{
        favicon:path.resolve(__dirname,'./favicon.ico'),
        meta:{
            'a':{
                name:'viewport',
                content:'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
            },
            'b':{
                name:'apple-mobile-web-app-capable',
                content:'yes'
            },
            'c':{
                name:'apple-mobile-web-app-status-bar-style',
                content:'black-translucent'
            },
            'd':{
                name:'screen-orientation',
                content:'portrait'
            },
            'e':{
                name:'x5-orientation',
                content:'portrait'
            },
            'f':{
                name:'format-detection',
                content:'telephone=no'
            },
            'g':{
                name:'description',
                content:'panda'
            },
            'h':{
                name:'keywords',
                content:'panda,panpan'
            }
        }
    },
    // 各个html页面可扩展的htmlwebpackPlugin配置
    viewsHtmlWebpackPluginOptions:{
        index:{
            meta:{
                'a':{
                    name:'viewport',
                    content:'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
                },
            }
        }
    }
}