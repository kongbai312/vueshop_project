<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              payInfo.orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ payInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a href="javascript:;" class="btn" @click="pay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode"; //生成二维码用
export default {
  name: "Pay",
  data() {
    return {
      orderId: "", //订单支付Id
      payInfo: {}, //用来存储订单支付信息
      payStatus:0,  //用户订单支付状态   
    };
  },
  beforeMount() {
    //通过路由获取订单id
    this.orderId = this.$route.query.orderId;
  },
  mounted() {
    //发送请求，获取订单支付信息
    this.getPayInfo();
  },
  methods: {
    //发送请求，获取订单支付信息的函数
    async getPayInfo() {
      const result = await this.$API.reqPagInfo(this.orderId);
      if (result.code === 200) {
        this.payInfo = result.data;
      }
    },

    //支付弹窗
    async pay() {
      try {
        //通过请求获取订单codeUrl生成二维码
        const imgUrl = await QRCode.toDataURL(this.payInfo.codeUrl);
        //element-Ui的消息盒子
        this.$alert(`<img src="${imgUrl}" />`, "请使用微信扫码支付", {
          dangerouslyUseHTMLString: true,
          showClose: false, //右上角是否显示X
          showCancelButton: true, //是否显示取消按钮
          cancelButtonText: "支付遇到问题", //取消按钮的文字
          confirmButtonText: "我已成功支付", //确定按钮的文字
          center: true, //是否布局居中
          beforeClose:(action, instance, done)=>{
            //action的值可以为'confirm', 'cancel'或'close'
            if(action === 'confirm'){//点击已支付 进入逻辑
              // if(this.payStatus !== 200){
              //    this.$message.warning('请确认是否支付成功，支付成功后将自动跳转')
              // }
              
              //后门
              //清除定时器
              clearInterval(this.timer)
              this.timer = null
              //关闭消息盒子
              done()
              //跳转至成功页面
              this.$router.push('/paysuccess')
            }
            else if(action === 'cancel'){
              this.$message.error('支付失败')
              //清除定时器
              clearInterval(this.timer)
              this.timer = null
              //关闭消息盒子
              done()
            }
          }
        })
        .then()//点击已支付，进入这步
        .catch()//点击取消支付，进入这步
        //但实际过程用的是关闭前的回调函数beforeClose

        //循环发送请求，获取订单支付状态
        //判断定时器是否存在
        if(!this.timer){//定时器不存在时，进入判断
          //创建定时器
          this.timer = setInterval(async ()=>{
            //发送请求
            const result = await this.$API.reqPayStatus(this.orderId)
            if(result.code===200){//支付成功 进入判断
              //存储支付成功的状态 为了后期用户点击按钮的判断依据
              this.payStatus = 200
              //跳转至成功页面
              this.$router.push('/paysuccess')
              //清除定时器
              clearInterval(this.timer)
              this.timer = null
              //关闭消息盒子
              this.$msgbox.close()
            }
          },2000)
        }
        

      } catch (err) {
        alert('二维码生成失败')
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>