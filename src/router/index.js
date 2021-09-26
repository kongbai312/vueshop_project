import Vue from "vue"
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import routes from "@/router/routes"

import store from "@/store"

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

  

const router = new VueRouter({
    //浏览器方式
    mode:'history',
    //从routes.js中导入routes
    routes,
    //页面跳转时，页面所处的位置
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
})

//导航守卫  全局前置守卫
router.beforeEach(async (to, from, next) => {
  //将token取过来
  let token = store.state.user.token
  //如果token存在
  if(token){
    //如果已经登录了，仍然去登录页面
    if(to.path==='/login'){
      //跳转至首页
      next('/')
    }
    //登录过了，去其他页面，则获取用户信息
    else{
      //判断用户信息是否存在
      let hasUserInfo = !!store.state.user.userInfo.nickName
      //如果用户信息已存在
      if(hasUserInfo){
        //放行，继续跳转
        next()
      }
      else{
        try {
          //发送请求,获取用户信息
          await store.dispatch('getUserInfo')
          //放行，继续跳转
          next()
        } catch (error) {
          alert('登录超时或其他错误，请重新登录')
          //清除token和用户信息
          store.dispatch('resetUserInfo')
          //跳转至登录页面，并将之前的界面存储
          next('/login?redirect='+to.path)
        }
      }
    }
  }
  else{
    //当用户没有登录时，访问订单信息页面，支付相关页面，我的订单页面需要跳转至登录页面
    if(to.path.startsWith('/trade') || to.path.startsWith('/pay') || to.path.startsWith('/center')){
      next('/login?redirect='+to.path)
    }
    else{
      next()
    }
  }
})

export default router


