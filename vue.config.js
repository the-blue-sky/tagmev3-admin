// vue.config.js

// vue3之后编译完成不再生成build目录 所有相关配置都走默认 要修改配置就要在根目录创建这个文件
module.exports = {
    // vue3之后baseUrl改成了publicPath 如果应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/ 默认是'/'
    // 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中
    // publicPath: '/admin',
    // 默认生成文件的位置
    outputDir: 'admin',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: '',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径 Default: 'index.html'
    indexPath: 'index.html',
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希
    filenameHashing: true,
    // chainWebpack: config => {
    //     //路径配置
    //     config.resolve.alias
    //         .set('assets', resolve('src/assets'))
    //         // .set('styles', resolve('src/assets/styles'))
    // },
    // webpack-dev-server 相关配置
    devServer: {
        // 调试端口
        port: 20001,
        disableHostCheck: true,
        // 如果前端应用和后端 API 服务器没有运行在同一个主机上，需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置
        // proxy: 'http://localhost:4000'
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:10000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    //其他配置....
}
