import ajax from './ajax.js'

//引入二次封装的mock的axios
import mockAjax from './mockAjax'

//  api/product/getBaseCategoryList 获取列表
//获取三级导航条
export function reqCategoryList(){
    return ajax({
        // url:'/product/getBaseCategoryList',
        url:'/product/getBaseCategoryList',    //json-server
        // url:'/home',//本地服务器测试
        method:'GET'
    })
}

//封装mock接口函数
export const reqRecommends = ()=>  mockAjax('/recommends')

export const reqFloors = ()=>  mockAjax('/floors')

//获取搜索列表
export const reqSearch = (searchParams)=>  ajax.post('/list',searchParams)


//获取轮播图
export const reqBannerList = ()=>  mockAjax('/banners')

//获取商品数据详情
export const reqDetailInfo = (skuId)=>{
    return ajax({
        url:`/item/${skuId}`,
        method:'GET'
    })
}

//添加购物车或修改
export const reqAddOrUpdata = (skuId,skuNum) =>{
    return ajax({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'POST'
    })
}

//获取购物车列表
export const reqCartList = () => {
    return ajax({
        url:'/cart/cartList',
        method:'GET'
    })
}

//修改购物车中单个商品的状态
export const reqUpdataCartChecked = (skuId,isChecked) =>{
    return ajax({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        mehtod:'GET'
    })
}

//删除购物车中单个商品
export const reqDeleteCart = (skuId) => {
    return ajax({
        url:`/cart/deleteCart/${skuId}`,
        method:'DELETE'
    })
}

//注册用户
export const reqUserRegister = (userInfo) => {
    return ajax({
        url:'/user/passport/register',
        method:'POST',
        data:userInfo
    })
}

//用户登录
export const reqUserLogin = (userInfo) => {
    return ajax({
        url:'/user/passport/login',
        method:'POST',
        data:userInfo
    })
}

//获取用户信息  由于在请求头中设置了token，则不用添加参数
export const reqUserInfo = () => {
    return ajax({
        url:'/user/passport/auth/getUserInfo',
        method:'GET'
    })
}

//退出登录
export const reqUserLogout = () => {
    return ajax({
        url:'/user/passport/logout',
        method:'GET'
    })
}

//获取收货地址
export const reqUserAddressList = () => {
    return ajax({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'GET'
    })
}

//获取订单交易页信息
export const reqTradeInfo = () => {
    return ajax({
        url:'/order/auth/trade',
        method:'GET'
    })
}

//提交订单 返回订单编号
export const reqSubmitOrder = (tradeNo,tradeData) => {
    return ajax({
        url:`order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'POST',
        data:tradeData
    })
}

//获取订单支付信息 
export const reqPagInfo = (orderId) => {
    return ajax({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'GET'
    })
}

//获取订单支付状态
export const reqPayStatus = (orderId) => {
    return ajax({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'GET'
    })
}

//获取订单列表
export const reqMyOrderList = (page,limit) => {
    return ajax({
        url:`/order/auth/${page}/${limit}`,
        method:'GET'
    })
}

//获取验证码
export const reqCode = (phone) =>{
    return ajax({
        url:`/user/passport/sendCode/${phone}`,
        method:'GET'
    })
}


//测试是否获得数据
// reqDetailInfo(6094).then(result=>{
//     console.log(result);
// }).catch(err=>{throw err})