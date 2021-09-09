<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isShowFooter"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// import {getCategoryList} from './api'
export default {
  name: 'App',
  mounted() {
    //测试用
    // reqCategoryList().then(result=>{
    //   console.log(result);
    // })
    
    //获取请求分类列表的异步action
    this.$store.dispatch('getCategoryList')
  },


  components:{
    Header,
    Footer
  }
}
</script>

<style>

</style>
