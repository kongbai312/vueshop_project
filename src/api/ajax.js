/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/

//引入axios
import axios from "axios"
//引入进度条
import NProgress from "nprogress"
import 'nprogress/nprogress.css'

const service = axios.create({
    // baseURL: 'http://182.92.128.115/api',   //基础路径
    baseURL:'http://localhost:3000',       //json-server测试
    // baseURL:'http://localhost:7000',        //本地服务器测试
    timeout: 20000                        //超时时间
})

//请求拦截器
service.interceptors.request.use((config)=>{
    //请求发出时，添加进度条
    NProgress.start();



    return config
}
)

//响应拦截器
service.interceptors.response.use(
    response =>{
        //成功后，进度条结束
        NProgress.done();


        return response.data
    },
    error => {
        //失败后，进度条结束
        NProgress.done();

        //失败处理
        alert(`请求出错，错误原因：${error.message} `|| '发生未知错误')

        // throw error
        //将失败的信息传递下去
        return Promise.reject(error)
    }
)


export default service