/* 
管理搜索模块的数据
*/
import {
    reqSearch
} from '@/api'

const state = {
    productList: {}, // 搜索出的商品列表相关数据的对象 
}
const mutations = {
    // 接收保存商品列表相关数据对象
    RECEIVE_PRODUCT_LIST(state, productList) {
        state.productList = productList
    }
}
const actions = {

    /* 
    根据指定的搜索条件, 异步获取商品列表的action
    */
    async getProductList({ commit }, searchParams) {
        //进行浅拷贝，避免删除 search组件中options的属性
        searchParams = {...searchParams}
        //进行对象的遍历，删除为空的数据，减少传递的参数
        Object.keys(searchParams).forEach((key)=>{
            if(searchParams[key]==="" || (Array.isArray(searchParams[key])  &&searchParams[key].length===0)){
                //删除对应为空的属性
                delete searchParams[key]
            }
        })
        // 1. ajax请求, 获取数据
        const result = await reqSearch(searchParams)
        // 2. 如果成功, 提交给mutation
        if (result.code === 200) {
            const productList = result.data
            commit('RECEIVE_PRODUCT_LIST', productList)
        }
    }
}
const getters = {
    //获取商品列表数据
    goodsList(state){
        return state.productList.goodsList || []
    },

    //获取品牌数据
    trademarkList(state){
        return state.productList.trademarkList || []
    },

    //获取 属性列表 数据
    attrsList(state){
        return state.productList.attrsList || []
    },
    
    //获取总页面数
    total(state){
        return state.productList.total || 0
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}