//引入mockjs
import Mock from 'mockjs'

//引入json格式的数据
import floors from './floors.json';
import recommends from './recommends.json';
import searchList from './searchList.json';
import banners from './banner.json'
import detail from './detail.json'

//使用mockjs
//今日推荐数据
Mock.mock('/mock/recommends',{code:200,data:recommends})

//楼层数据
Mock.mock('/mock/floors',{code:200,data:floors})

//搜索数据
Mock.mock('/mock/list',searchList)

//轮播图
Mock.mock('/mock/banners',{code:200,data:banners})

//商品数据详情
Mock.mock('/mock/detail',detail)

//添加商品到购物车或修改数量
Mock.mock('/mock/cart/addToCart','post',{
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
})

console.log('Mockserver已启动');