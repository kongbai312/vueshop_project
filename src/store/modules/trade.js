
import {
    reqUserAddressList,
    reqTradeInfo
} from "@/api"

const state = {
    userAddressList:[],
    tradeInfo:{}
}

const mutations = {
    RECEIVE_USERADDRESSLIST(state,userAddressList){
        state.userAddressList = userAddressList
    },
    RECEIVE_TRADEINFO(state,tradeInfo){
        state.tradeInfo = tradeInfo
    }
}

const actions = {
    //获取用户收货地址
    async getUserAddressList({commit}){
        const result = await reqUserAddressList()
        if(result.code === 200){
            commit('RECEIVE_USERADDRESSLIST',result.data)
        }
    },

    //获取订单交易页信息
    async getTradeInfo({commit}){
        const result = await reqTradeInfo()
        if(result.code === 200){
            commit('RECEIVE_TRADEINFO',result.data)
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