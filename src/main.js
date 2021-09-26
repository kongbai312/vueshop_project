import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import TypeNav from './components/TypeNav'
import MyPagination from './components/Pagination'

import * as API from "@/api"

// 图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'
// 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示loading图片
Vue.use(VueLazyload, { // 内部自定义了一个指令lazy
  loading,  // 指定未加载得到图片之前的loading图片
})

//引入mockServer
import './mock/mockServer'

//引用swiper
import '@/plugins/swiper'

//引用element-UI
import "@/plugins/elementUi"

//引用vee-validate表单验证
import "@/plugins/validate"

//注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(MyPagination.name,MyPagination)





new Vue({
  //绑定全局事件总线，与Vue.prototype.$bus = new Vue()效果一致
  beforeCreate() {
    Vue.prototype.$bus = this
    //将API装入原型对象
    Vue.prototype.$API = API
  },
  render: h => h(App),
  router,
  store,
  // created() {//防止页面刷新，vuex数据丢失
  //   //在页面加载时读取sessionStorage里的状态信息
  //   if (sessionStorage.getItem("store")) {
  //     this.$store.replaceState(
  //       Object.assign(
  //         {},
  //         this.$store.state,
  //         JSON.parse(sessionStorage.getItem("store"))
  //       )
  //     );
  //   }

  //   //在页面刷新时将vuex里的信息保存到sessionStorage里
  //   window.addEventListener("beforeunload", () => {
  //     sessionStorage.setItem("store", JSON.stringify(this.$store.state));  //无响应式
  //   });
}).$mount('#app')
