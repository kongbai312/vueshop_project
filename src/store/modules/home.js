//vuex子模块 home

//引入api
import {
    reqCategoryList,    //发送请求,获取CategoryList
    reqRecommends,       //发送请求,获取Recommends 
    reqFloors,          //发送请求,获取Floors
    reqBannerList          //发送请求获取banners
} from '@/api'

const state = {
    categoryList:[],
    recommends:[],
    floors:[],
    banners:[]
}

const mutations = {
    //接收三级分类列表
    RECEIVE_CATEGORY_LIST(state,data){
        //将数据传到state
        state.categoryList = data;
    },

    //接收recommends今日推荐的图片
    RECEIVE_RECOMMENDS(state,recommends){
        //将数据传到state
        state.recommends = recommends;
    },

    //接收floors楼层数据
    RECEIVE_FLOORS(state,floors){
        //将数据传到state
        state.floors = floors;
    },

    //接收轮播图数据
    RECEIVE_BANNERS(state,banners){
        state.banners = banners
    }
}

const actions = {
    //获取三级分类列表
    async getCategoryList({commit}){
        //调用封装的axios
        const result = await reqCategoryList()
        //判断是否发送成功
        if(result.code ===200){
            commit('RECEIVE_CATEGORY_LIST',result.data)
        }
    },
    
    //获取recommends今日推荐
    async getRecommends({commit}){
        //调用封装的axios
        const result = await reqRecommends()
        //判断是否发送成功
        if(result.code===200){
            commit('RECEIVE_RECOMMENDS',result.data)
        }
    },

    //获取floors楼层
    async getFloors({commit}){
        //调用封装的axios
        const result = await reqFloors()
        //判断是否发送成功
        if(result.code===200){
            commit('RECEIVE_FLOORS',result.data)
        }
    },

    //获取轮播图banners
    async getBannerList({commit}){
        //调用封装的axios
        const result = await reqBannerList()
        //判断是否发送成功
        if(result.code===200){
            commit('RECEIVE_BANNERS',result.data)
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