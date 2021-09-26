<template>
  <!--banner轮播-->
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="(img, index) in imgList" :key="img.id">
      <img
          :src="img.imgUrl"
          :class="{ active: defaultIndex === index }"
          @click="changeDefaultIndex(index)"
        />
    </swiper-slide>
    <!-- 点导航 -->
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- 按钮 -->
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
  <!-- <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
        <img
          :src="img.imgUrl"
          :class="{ active: defaultIndex === index }"
          @click="changeDefaultIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div> -->
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["imgList"],
  data() {
    return {
      defaultIndex: 0, //默认的图片位置
      swiperOptions: {//轮播图设置项
        // direction: "vertical", // 轮播模式切换选项，默认水平
        // loop: true, // 循环模式选项
        // autoplay: {
        //   //自动轮播
        //   delay: 4000, //4秒切换一次
        //   disableOnInteraction: false, //用户操作后是否停止自动轮播
        // },

        // 如果需要分页器
        // pagination: {
        //   el: ".swiper-pagination",
        // },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        slidesPerView:5,     //显示多少张图片
        slidesPerGroup:3    //一次切换几张
        // // 如果需要滚动条
        // scrollbar: {
        //   el: ".swiper-scrollbar",
        // },
      },
    };
  },
  methods: {
    //点击轮播图的图片切换图片
    changeDefaultIndex(index) {
      //更改小图的图片
      this.defaultIndex = index;

      //更改中图的图片
      this.$bus.$emit("syncDefaultIndex", index);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>