//vuex子模块 user

//引入封装的功能函数
import {getUserTempId,setToken,getToken,removeToken} from "@/utils/userabout"

//引入api函数
import {
    reqUserRegister,
    reqUserLogin,
    reqUserInfo,
    reqUserLogout,
    reqCode
} from '@/api';

const state = {
    userTempId:getUserTempId(), //临时标识符，用来添加购物车
    token:getToken(),
    userInfo:{}
}

const mutations = {
    RECEIVE_TOKEN(state,token){
        state.token = token
    },
    RECEIVE_USERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    RESET_USERINFO(state){
        state.token = getToken()
        state.userInfo = {}
    }
}

const actions = {
    //发送请求用于获取验证码
    async getCode({commit},phone){
        const result = await reqCode(phone)
        if(result.code===200){
            return result.data
        }
        else{
            return Promise.reject(new Error('验证码获取失败'))
        }
    },

    //用于发送请求注册用户
    async userRegister({commit},userInfo){
        //发送请求
        let result = await reqUserRegister(userInfo)
        //判断是否发送成功
        if(result.code ===200){
            return 'ok'
        }
        else{
            return Promise.reject(new Error('failed'))
        }
    },

    //用于发送请求登录用户
    async userLogin({commit},userInfo){
        //调用接口，发送请求
        const result = await reqUserLogin(userInfo)
        //判断是否发送成功
        if(result.code === 200){
            //将token提交至mutations
            commit('RECEIVE_TOKEN',result.data.token)
            //将token存入本地localStorage,以便自动登录
            //调用封装好的功能函数
            setToken(result.data.token)
            //因为获取发送请求后还需跳转路由，有后续操作，所以需要返回值
            return 'ok'
        }
        else{
            return Promise.reject(new Error('failed'))
        }
    },

    //用于获取用户信息
    async getUserInfo({commit}){
        //发送请求获取用户信息
        const result = await reqUserInfo()
        //如果获取成功
        if(result.code  === 200){
            commit('RECEIVE_USERINFO',result.data)
            return 'ok'
        }
        else{
            return Promise.reject(new Error('failed'))
        }
    },

    //用于清除token和用户信息
    resetUserInfo({commit}){
        //清除localStorage中的token
        removeToken()
        //清除state中的token和userInfo
        commit('RESET_USERINFO')
    },

    //用于退出登录
    async userLogout({commit}){
        //发送请求退出登录
        const result = await reqUserLogout()
        if(result.code === 200){
            //清除localStorage中的token
            removeToken()
            //清除state中的token和userInfo
            commit('RESET_USERINFO')

            return 'ok'
        }
        else{
            return Promise.reject(new Error('failed'))
        }
    }
}

const getters = {
    
}


export default {
    state,
    mutations,
    actions,
    getters
}