<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big" >
      <img :src="defaultImg.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['imgList'],
    data() {
      return {
        defaultIndex:0  //显示图片的默认下标
      }
    },
    mounted() {
      this.$bus.$on('syncDefaultIndex',this.syncDefaultIndex)
    },
    computed:{
      defaultImg(){
        return this.imgList[this.defaultIndex] || {}
      }
    },
    methods: {
      //同步index，使得图片一致
      syncDefaultIndex(index){
        this.defaultIndex = index
      },

      //鼠标移动，控制遮罩移动
      move(event){
        
        //获取鼠标的位置
        let mouseX = event.offsetX
        let mouseY = event.offsetY

        //获取mask元素的大小
        let maskWidth = this.$refs.mask.offsetWidth
        let maskHeight = this.$refs.mask.offsetHeight

        //获取mask移动的多少
        let maskX = mouseX - maskWidth/2
        let maskY = mouseY - maskHeight/2

        //限制移动范围
        if(maskX<0){
          maskX = 0
        }else if(maskX > maskWidth){ //因为大盒子是mask宽度的两倍
          maskX = maskWidth
        }

        if(maskY<0){
          maskY = 0
        }else if(maskY > maskHeight){
          maskY = maskHeight
        }

        //使mask移动
        this.$refs.mask.style.left = maskX +'px'
        this.$refs.mask.style.top = maskY +'px'

        //使大图移动  大图是中图的两倍
        this.$refs.big.style.left = -2*maskX +'px'
        this.$refs.big.style.top = -2*maskY +'px'
      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>