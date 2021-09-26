import {
    reqAddOrUpdata,
    reqCartList,
    reqUpdataCartChecked,
    reqDeleteCart
} from '@/api';

const state = {
    ShopCartList:[
        {cartInfoList:[]}
    ]
}

const mutations = {
    RECEIVE_SHOPCARTLIST(state,ShopCartList){
        state.ShopCartList = ShopCartList
    }
}

const actions = {
    async addOrUpdataCart({commit},{skuId,skuNum}){
        //发送请求添加至购物车
        const result = await reqAddOrUpdata(skuId,skuNum)
        //判断是否成功
        if(result.code === 200){
            return 'ok'
        }else {
            return Promise.reject(new Error('failed'))
        }
    },

    //获取购物车列表
    async getShopCartList({commit}){
        //发送请求获取购物车列表
        const result = await reqCartList()
        //判断是否成功
        if(result.code === 200){
            let cartList = []
            if(result.data.length===0){
                cartList = []
            }else{
                cartList = (result.data)[0].cartInfoList
            }
            commit('RECEIVE_SHOPCARTLIST',cartList) 
        }
    },

    //修改购物车中单个商品的状态
    async updataCartChecked({commit},{skuId,isChecked}){
        const result = await reqUpdataCartChecked(skuId,isChecked)
        if(result.code === 200){
            return 'ok'
        }
        else{
            return Promise.reject(new Error('failed'))
        }
    },

    //修改购物车多个商品的状态
    async updataCartCheckedAll({commit,state,dispatch},isChecked){
        //存储所有的promise
        let promises =[]
        //遍历购物车列表，看商品状态是否与全选状态一致
        state.ShopCartList.forEach(item => {
            //如果一致就下个商品
            if(item.isChecked === isChecked){
                return
            }
            //不一致则发送请求修改状态
            let promise = dispatch('updataCartChecked',{skuId:item.skuId,isChecked})
            //将promise存入数组
            promises.push(promise)
        });
        //检查看看是否所有都发送成功
        return Promise.all(promises)
    },

    //删除购物车中单个商品
    async deleteCart({commit},skuId){
        const result = await reqDeleteCart(skuId)
        if(result.code ===200){
            return 'ok'
        }
        else{
            return Promise.reject(new Error('failed'))
        }
    },

    //删除购物车中多个商品
    async deleteCartAll({commit,dispatch,state}){
        //存储所有的promise
        let promises = []
        state.ShopCartList.forEach(item=>{
            //如果没选中，则直接返回
            if(!item.isChecked){
                return
            }
            //选中了则删除
            let promise = dispatch('deleteCart',item.skuId)
            promises.push(promise)
        })
        
        return Promise.all(promises)
    }
}

const getters = {
    shopCartList(state){
        return state.ShopCartList || []
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}