//postcss.config.js
module.exports = {
    plugins: [
        require('autoprefixer')({
            // 将不会自动移除自己添加的-webkit-样式
            remove: false
        }),
        require('cssnano')
    ]
}