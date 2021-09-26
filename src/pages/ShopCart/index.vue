<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="shopCart in shopCartList"
          :key="shopCart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shopCart.isChecked"
              @click="updataOne(shopCart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="shopCart.imgUrl" />
            <div class="item-msg">{{ shopCart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ shopCart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeCartNum(shopCart, -1, true)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="shopCart.skuNum"
              minnum="1"
              class="itxt"
              @change="
                changeCartNum(shopCart, parseInt($event.target.value), false)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeCartNum(shopCart, 1, true)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ shopCart.cartPrice * shopCart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOne(shopCart)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }} </span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allMoney }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopCartList();
  },
  methods: {
    //调用actions发送请求 获取购物车列表
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
    },

    //更改购物车的商品数量
    async changeCartNum(shopCart, disNum, flag) {
      //判断disNum是否为变化量
      if (!flag) {
        // 正常情况
        if (disNum > 0) {
          disNum = disNum - shopCart.skuNum;
        }
        //输入值为小于或等于0情况
        else {
          disNum = 1 - shopCart.skuNum;
        }
      }
      //如果直接是变化量
      else {
        //为1的时候无法再减
        if (disNum + shopCart.skuNum <= 0) {
          disNum = 1 - shopCart.skuNum;
        }
      }

      //此时的disNum可用
      try {
        //发送请求修改购物车
        await this.$store.dispatch("addOrUpdataCart", {
          skuId: shopCart.skuId,
          skuNum: disNum,
        });
        //修改成功
        alert("购物车修改成功");
        //重新获取购物车列表
        this.getShopCartList();
      } catch (error) {
        alert("错误原因：" + error.message);
      }
    },

    //修改购物车中单个商品的状态
    async updataOne(shopCart) {
      try {
        //发送请求修改数据
        await this.$store.dispatch("updataCartChecked", {
          skuId: shopCart.skuId,
          isChecked: shopCart.isChecked ? 0 : 1,
        });
        //重新获取购物车列表
        this.getShopCartList();
      } catch (error) {
        alert("错误原因：" + error.message);
      }
    },

    //删除购物车单个商品
    async deleteOne(shopCart) {
      try {
        if (confirm(`是否要删除商品：${shopCart.skuName}`)) {
          //发送请求删除单个商品
          await this.$store.dispatch("deleteCart", shopCart.skuId);
          //重新获取购物车列表
          this.getShopCartList();
        }
      } catch (error) {
        alert("错误原因:" + error.message);
      }
    },

    //删除所有商品
    async deleteAll() {
      try {
        //发送请求删除所有选中商品
        await this.$store.dispatch("deleteCartAll");
        //重新获取购物车列表
        await this.$store.dispatch("getShopCartList");
      } catch (error) {
        alert("错误原因：" + error.message);
      }
    },
  },

  computed: {
    //获取购物车列表数据
    // ...mapGetters(['shopCartList']),
    ...mapState({
      shopCartList: (state) =>
        state.shopcart.ShopCartList || { cartInfoList: [] },
    }),

    //计算已选择的商品数量
    checkedNum() {
      return this.shopCartList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.skuNum;
        }
        return prev;
      }, 0);
    },

    //计算已选择商品的总价
    allMoney() {
      return this.shopCartList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.cartPrice * item.skuNum;
        }
        return prev;
      }, 0);
    },

    //用来设置全选
    isAllChecked: {
      get() {
        //当所有的商品都是已选择时 全选打勾
        if (this.shopCartList.length === 0) {
          return false;
        } else {
          return this.shopCartList.every((item) => {
            return item.isChecked;
          });
        }
      },
      async set(val) {
        try {
          //点击全选，调用全选请求
          await this.$store.dispatch("updataCartCheckedAll", val ? 1 : 0);
          //重新获取购物车列表
          this.getShopCartList();
        } catch (error) {
          alert("错误原因：", error.message);
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>