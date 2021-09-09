import ajax from './ajax.js'

//引入二次封装的mock的axios
import mockAjax from './mockAjax'

//  api/product/getBaseCategoryList 获取列表

export function reqCategoryList(){
    return ajax({
        // url:'/product/getBaseCategoryList',
        url:'/api_product_getBaseCategoryList',    //json-server
        // url:'/home',//本地服务器测试
        method:'GET'
    })
}

//封装mock接口函数
export const reqRecommends = ()=>  mockAjax('/recommends')

export const reqFloors = ()=>  mockAjax('/floors')

//测试是否获得数据
// reqRecommends().then(result=>{
//     console.log(result);
// }).catch(err=>{throw err})