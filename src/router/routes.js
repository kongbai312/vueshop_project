//路由懒加载
// import Home from "@/pages/Home"
const Home = ()=>import('@/pages/Home')
// import Login from "@/pages/Login"
const Login = ()=>import('@/pages/Login')
// import Register from "@/pages/Register"
const Register = ()=>import('@/pages/Register')
// import Search from "@/pages/Search"
const Search = ()=>import('@/pages/Search')
// import Detail from '@/pages/Detail'
const Detail = ()=>import('@/pages/Detail')
// import AddCartSuccess from "@/pages/AddCartSuccess"
const AddCartSuccess = ()=>import('@/pages/AddCartSuccess')
// import ShopCart from "@/pages/ShopCart"
const ShopCart = ()=>import('@/pages/ShopCart')
// import Trade from "@/pages/Trade"
const Trade = ()=>import('@/pages/Trade')
// import Pay from "@/pages/Pay"
const Pay = ()=>import('@/pages/Pay')
// import PaySuccess from "@/pages/PaySuccess"
const PaySuccess = ()=>import('@/pages/PaySuccess')
// import Center from "@/pages/Center"
const Center = ()=>import('@/pages/Center')
// import MyOrder from "@/pages/Center/MyOrder"
const MyOrder = ()=>import('@/pages/Center/MyOrder')
// import GroupOrder from "@/pages/Center/GroupOrder"
const GroupOrder = ()=>import('@/pages/Center/GroupOrder')


export default [
    {
        path:'/center',
        component:Center,
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'',
                redirect:'myorder'
            }
        ]
    },
    {
        path:'/pay',
        component:Pay,
        //配置路由独享守卫
        //只有从交易页面（创建订单）页面才能跳转到支付页面
        beforeEnter: (to, from, next) => {
            if(from.path==='/trade'){
                next()
            }
            else{
                alert('无法跳转，即将跳回首页')
                next('/')
            }
        }
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        //配置路由独享守卫
        //只有从支付页面才能跳转到支付成功页面
        beforeEnter: (to, from, next) => {
            if(from.path==='/pay'){
                next()
            }
            else{
                alert('无法跳转，即将跳回首页')
                next('/')
            }
        }
    },
    {
        path:'/trade',
        component:Trade,
        //配置路由独享守卫
        //只有从购物车界面才能跳转到交易页面（创建订单）
        beforeEnter: (to, from, next) => {
            if(from.path==='/shopcart'){
                next()
            }
            else{
                alert('无法跳转，即将跳回首页')
                next('/')
            }
        }
    },
    {
        path:'/shopcart',
        component:ShopCart
    },
    {
        path:'/addcartsuccess',
        component:AddCartSuccess,
        //配置路由独享守卫
        //只有携带了skuNum和sessionStorage内部有skuInfo数据  才能看到添加购物车成功的界面
        beforeEnter: (to, from, next) => {
            let skuNum = to.query.skuNum
            let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
            if(skuNum && skuInfo){
                next()
            }
            else{
                alert('无法跳转，即将跳回首页')
                next('/')
            }
        }
    },
    {
        path:'/detail/:skuId',
        component:Detail
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/login',
        component:Login,
        meta:{
            isShowFooter:true
        }
    },
    {
        path:'/register',
        component:Register,
        meta:{
            isShowFooter:true
        }
    },
    {
        //问号代表可以为空
        path:'/search/:keyword?',
        component:Search,
        name:'search',
    },
    {
        path:'/',
        redirect:'/home'
    }
]