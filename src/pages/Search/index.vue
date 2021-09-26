<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="options.categoryName">
              {{ options.categoryName }}
              <i @click="removeCategory">×</i>
            </li>
            <li class="with-x" v-if="options.keyword">
              {{ options.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="options.trademark">
              {{ options.trademark }}
              <i @click="removeTrademark">×</i>
            </li>
            <li class="with-x" v-for="(prop,index) in options.props" :key="prop">
              {{prop}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" @addProps="addProps"></SearchSelector>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:orderArr[0]==='1'}" @click="setOrder('1')">
                  <a href="javascript:;">
                    综合
                    <i class="iconfont"
                      :class="orderArr[1]==='asc'?'icon-up':'icon-down'"
                      v-if="orderArr[0]==='1'"
                    ></i>
                  </a>
                </li>
                <li :class="{active:orderArr[0]==='3'}" @click="setOrder('3')">
                  <a href="javascript:;">
                    销量
                    <i class="iconfont"
                      :class="orderArr[1]==='asc'?'icon-up':'icon-down'"
                      v-if="orderArr[0]==='3'"
                    ></i>
                  </a>
                </li>
                <li :class="{active:orderArr[0]==='4'}" @click="setOrder('4')">
                  <a href="javascript:;">
                    新品
                    <i class="iconfont"
                      :class="orderArr[1]==='asc'?'icon-up':'icon-down'"
                      v-if="orderArr[0]==='4'"
                    ></i>
                  </a>
                </li>
                <li :class="{active:orderArr[0]==='5'}" @click="setOrder('5')">
                  <a href="javascript:;">
                    评价
                    <i class="iconfont"
                      :class="orderArr[1]==='asc'?'icon-up':'icon-down'"
                      v-if="orderArr[0]==='5'"
                    ></i>
                  </a>
                </li>
                <li :class="{active:orderArr[0]==='2'}" @click="setOrder('2')">
                  <a href="javascript:;">
                    价格
                    <i class="iconfont"
                      :class="orderArr[1]==='asc'?'icon-up':'icon-down'"
                      v-if="orderArr[0]==='2'"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank">
                      <img :src="item.defaultImg" />
                    </a> -->
                    <router-link :to="`/detail/${item.id}`">
                      <img v-lazy="item.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <!-- <a href="item.html">{{ item.title }}</a> -->
                    <router-link :to="`/detail/${item.id}`">
                      {{ item.title }}
                    </router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <MyPagination
            :currentPage="options.pageNo" 
            :total="total" 
            :pageSize="options.pageSize" 
            :showPageNo="5" 
            @currentChange="getShopList"
          ></MyPagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      options: {
        category1Id: "", // 一级分类ID
        category2Id: "", // 二级分类ID
        category3Id: "", // 三级分类ID
        categoryName: "", // 分类名称
        keyword: "", // 搜索关键字
        props: [], // ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"]
        trademark: "", // 品牌: "ID:品牌名称"示例: "1:苹果"
        order:"1:desc", // 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序 示例: "1:desc"
        pageNo: 1, // 页码
        pageSize: 10, // 每页数量
      },
    };
  },

  components: {
    SearchSelector,
  },

  //在created收集参数到options中，并发送请求
  // created() {
  //   //更新options数据
  //   this.updataParams();
  //   //发送搜索请求
  //   this.getShopList();
  // },

  computed: {
    //获取数据
    ...mapGetters(["goodsList","total"]),
    //获取当前分类标识和排序的数组
    orderArr(){
      return this.options.order.split(':')
    }
  },
  watch: {
    //解决搜索页面搜索时，页面为发生变化问题 数据有变化才调用
    $route: {
      handler(newVal,oldVal) {
        //更新options数据
        this.updataParams();
        //发送搜索请求
        this.getShopList();
      },
      immediate:true //初始化，一定执行一次回调函数
    },
  },
  methods: {
    // //页面变化回调
    // currentChange(page){
    //   this.options.pageNo = page
    //   //重新发送请求
    //   this.getShopList();
    // },

    //设置新的排序order
    setOrder(orderFlag){
      // 更新options中的order
		  // 点击的是当前排序项: 只需要切换orderType
		  // 点击的不是当前排序项:  更新orderFlag为指定的值, orderType更新为desc
      
      //获取当前的order
      let [flag,type] = this.orderArr
      //如果点击的是当前排序项: 只需要切换orderType
      if(flag === orderFlag){
        type = type==='desc'?'asc':'desc'
      }
      // 点击的不是当前排序项:  更新orderFlag为指定的值, orderType更新为desc
      else{
        flag = orderFlag
        type = 'desc'
      }
      this.options.order = flag +':'+type
      //重新发送请求
      this.getShopList()
    },

    //移除单个属性
    removeProp(index){
      this.options.props.splice(index,1)
      //重新发送请求
      this.getShopList();
    },

    //添加属性列表
    addProps(prop){
      //如果存在则不添加
      const {props} = this.options
      if(props.includes(prop)) return
      this.options.props.push(prop)
      //重新发送请求
      this.getShopList();
    },

    //移除品牌标签
    removeTrademark(){
      this.options.trademark =''
      //重新发送请求
      this.getShopList()
    },

    //设置品牌选择
    setTrademark(trademark){
      //防止重复发送请求
      if(trademark ===this.options.trademark) return
      this.options.trademark = trademark
      //重新发送请求
      this.getShopList();
    },

    //更新 options数据
    updataParams() {
      const { keyword } = this.$route.params;
      const { category1Id, category2Id, category3Id, categoryName } = this.$route.query;
      //重新赋值options
      this.options = {
        ...this.options,
        keyword,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      };
    },

    //发送请求
    getShopList(page=1) {
      this.options.pageNo = page
      this.$store.dispatch("getProductList", this.options);
    },

    //点击× 删除Category
    removeCategory() {
      this.options.category1Id = "";
      this.options.category2Id = "";
      this.options.category3Id = "";
      this.options.categoryName = "";
      // //重新发送请求  存在路由参数一直在的问题
      // this.getShopList();

      //设置跳转的路由对象
      const location = {
        name: "search",
        params: this.$route.params, //携带当前路由已有的params参数
      };
      //进行路由的跳转,不再携带query参数
      this.$router.replace(location);
    },

    //点击× 删除keyword
    removeKeyword() {
      this.options.keyword = "";
      //设置跳转的路由对象
      const location = {
        name: "search",
        query: this.$route.query,
      };
      //进行路由的跳转，不再携带params参数
      this.$router.replace(location);

      //分发事件
      this.$bus.$emit("removeKeyword");
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>