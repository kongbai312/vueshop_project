import Vue from "vue"
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import routes from "@/router/routes"

// 缓存原本的push方法
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// 指定新的push方法 在index.js中配置
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    // console.log('push', onResolve, onReject)
    // 如果指定了成功或失败的回调
    if (onResolve || onReject) {
      // 直接调用原本的push方法
      // originalPush(location, onResolve, onReject)  // this不是router而是undefined
      return originalPush.call(this, location, onResolve, onReject)
    } 
    // 没有指定成功或失败回调, 必须用catch处理
    return originalPush.call(this, location).catch((err) => {
      // 如果是重复导航产生的错误, 不再向外传递错误
      if (VueRouter.isNavigationFailure(err)) {
        // resolve err
        return err  // 产生的是成功的promise, 成功promise的value是err
      }
      // 如果是其它原因导航的错误, 将错误向下传递
      // throw error
      return Promise.reject(err)
    })
  }
  
  VueRouter.prototype.replace = function (location, onResolve, onReject) {
    if (onResolve || onReject) {
      return originalReplace.call(this, location, onResolve, onReject)
    } 
    return originalReplace.call(this, location).catch((err) => {
      if (VueRouter.isNavigationFailure(err)) {
        return err  
      }
      return Promise.reject(err)
    })
  }


export default new VueRouter({
    //浏览器方式
    mode:'history',
    //从routes.js中导入routes
    routes,
})