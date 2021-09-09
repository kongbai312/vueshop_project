import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import TypeNav from './components/TypeNav'

//引入mockServer
import './mock/mockServer'

//引用swiper
import '@/plugins/swiper'
//注册全局组件
Vue.component(TypeNav.name,TypeNav)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
