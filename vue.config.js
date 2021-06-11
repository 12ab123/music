const path = require('path')
function resolve(dir) {
 return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,          //关闭eslint语法检查
    css: {
        loaderOptions: {
            less: {            
                modifyVars: {
                    hack: `true; @import "/src/unit/css/my-vant-style.less";`,
                },    
            },
            
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                         //lib-flexible 将屏幕分成10份(10rem)，这里设置表示设计图宽度为10*37.5=375px
                            // 配置成 37.5 是为了兼容 没有适配 rem 布局的第三方 ui 库
                        remUnit: 37.5
                    })
                ]
            }
        }
    },
    devServer: {
        proxy: {
            //匹配处理以/api开头语的请求
            "/api": {
              target: "http://localhost:3000",          //转发的目标地址
              pathRewrite: {"^/api" : ""},              //在转发请求前去除路径中的/api
              changeOrigin: true                        //支持协议名的跨域
            }
        }
    },

    chainWebpack: config => {
        config.resolve.alias
         .set('@', resolve('src'))
    },


}


