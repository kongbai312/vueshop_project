import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"






export default [
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