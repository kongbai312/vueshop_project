module.exports = {
    lintOnSave: false,
    // devServer:{
    //     //配置代理服务器
    //     proxy: {
    //         //标识
    //         "/home": {   //当有home时跨域
    //             //本身      8080/api/users/info
    //             //转发的目标服务器      4000/api/user/info 与真正的服务器多了个/api
    //             target: "http://localhost:3000",
    //             //把多的/api去掉
    //             // pathRewrite: {"^/api" : ""},  //要看真正的后台接口路径当中有没有包含/api，有就不用去掉，没有就得去掉
    //             //不管改变跨域的哪个条件，都会转发
    //             changeOrigin:true
    //         }
    //     }
    // }
}