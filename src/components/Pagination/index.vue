<template>
  <div class="pagination">
    <button :disabled="myCurrentPage===1" :class="{disable:myCurrentPage===1}" @click="setCurrentPage(myCurrentPage-1)">上一页</button>
    <button v-if="startEnd.start!==1" @click="setCurrentPage(1)">1</button>
    <button class="disable" v-if="startEnd.start>=3">···</button>

    <!-- v-for和v-if同时使用,会造成多次调用无用的if,造成效率低 -->
    <!-- <button v-for="item in startEnd.end"  v-if="item>=startEnd.start" :key="item" 
      :class="{active:item===myCurrentPage}" @click="setCurrentPage(item)">{{item}}</button> -->
    
    <button v-for="item in startEndArr" :key="item" 
      :class="{active:item===myCurrentPage}" @click="setCurrentPage(item)">{{item}}</button>
    
    <button class="disable" v-if="startEnd.end<=totalPages-2">···</button>
    <button v-if="startEnd.end<totalPages" @click="setCurrentPage(totalPages)">{{totalPages}}</button>
    <button :disabled="myCurrentPage===totalPages" :class="{disable:myCurrentPage===totalPages}" @click="setCurrentPage(myCurrentPage+1)">下一页</button>
    
    <button style="margin-left: 30px" class="disable">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'MyPagination',
  props:{
    currentPage:{//当前页码
      type:Number,
      default:1
    },
    total:{//所有数据的总数量
      type:Number,
      default:0
    },
    pageSize:{ //每页最大放多少个商品
      type:Number,
      default:10
    },
    showPageNo:{ //最大连续页码数
      type:Number,
      default:5,
      validator:function(value){//限制最大页面数必须为奇数
        return value%2===1
      }
    }
  },
  data() {
    return {
      myCurrentPage:this.currentPage,  //内部保存的当前页码数

    }
  },

  methods: {
    setCurrentPage(page){
      if(this.myCurrentPage === page) return
      this.myCurrentPage = page
      //给父组件发送事件 分发自定义事件
      this.$emit('currentChange',page)
    }
  },

  computed:{
    //总页数    
    // 所有数据的总数量 / 每页最大放多少个商品 并向上取整
    // 如 13     /     4      共4页
    //  total   /  pageSize
    totalPages(){
      return Math.ceil(this.total/this.pageSize)
    },

    //start/end: 连续页码数的开始页码与结束页码
    startEnd(){
      let start,end
      //取出所需数据
      const {myCurrentPage,showPageNo,totalPages} = this
      //start
      // 需要数据   当前页码      连续页码数    总页数
      //需要数据 myCurrentPage  showPageNo  totalPages
      //             4               5          8         23[4]56
      //
      start = myCurrentPage - (showPageNo-1)/2
      //  当前页码      连续页码数    总页数
      //    2             5           8             1【2】345
      //start = 2 -(5-1)/2 =0
      if(start<1){
        start = 1
      }
      //end
      //  当前页码      连续页码数    总页数
      //myCurrentPage  showPageNo  totalPages
      //      4               5          8         23[4]56
      end = start + (showPageNo-1)
      //  当前页码      连续页码数    总页数
      //myCurrentPage  showPageNo  totalPages
      //      7              5          8         456[7]8
      // end = 5  + 5 - 1 = 9   end = 8  start = end -showPageNo +1
      if(end>totalPages){
        end = totalPages
        start = end - showPageNo + 1
        //  当前页码      连续页码数    总页数
        //myCurrentPage  showPageNo  totalPages
        //      2              5          3         1[2]3
        if(start<1){
          start = 1
        }
      }
      return {start,end}
    },

    //包含start至end的数组
    startEndArr(){
      let arr = []
      const {start,end} = this.startEnd
      //将start 和 end页数存入数组
      for (let page = start; page <= end; page++) {
        arr.push(page) 
      }
      
      return arr
    }
  },

  watch:{
    //监视父组件传入的数据变化
    currentPage:{
      handler(newValue,oldValue){
        this.myCurrentPage = newValue
      }
    }
  }
  }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &.active {
        background: blue;
        color: white;
        cursor: not-allowed;
      }

      &.disable {
        cursor: not-allowed;
        color: #ccc;
      }
    }
  }
</style>
