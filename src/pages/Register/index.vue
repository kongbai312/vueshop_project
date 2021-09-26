<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 
          <!-- <a href="login.html">登陆</a> -->
          <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <!-- <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone">
        <span class="error-msg">错误提示信息</span> -->

        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号"
        v-model="phone" name="phone" v-validate="{required: true,regex: /^1\d{10}$/}" 
        :class="{invalid: errors.has('phone')}">
        <span class="error-msg">{{ errors.first('phone') }}</span>
      </div>
      <div class="content">
        <!-- <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code">
        <img ref="code" src="" alt="code">
        <span class="error-msg">错误提示信息</span> -->

        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码"
        v-model="code" name="code" v-validate="{required: true,regex: /^\d{6}$/}" 
        :class="{invalid: errors.has('code')}">
        <el-button :disabled="!isClickCode" type="primary" @click="getCode()" style="margin-left:10px;">{{codeText}}</el-button>
        <span class="error-msg">{{ errors.first('code') }}</span>
      </div>
      <div class="content">
        <!-- <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码" v-model="password">
        <span class="error-msg">错误提示信息</span> -->
        
        <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码"
        v-model="password" name="password" v-validate="{required: true,regex: /^\w{6,18}$/}" 
        :class="{invalid: errors.has('password')}">
        <span class="error-msg">{{ errors.first('password') }}</span>
      </div>
      <div class="content">
        <!-- <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model="password2">
        <span class="error-msg">错误提示信息</span> -->

        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码"
        v-model="password2" name="password2" v-validate="{required: true,is:(password)}" 
        :class="{invalid: errors.has('password2')}">
        <span class="error-msg">{{ errors.first('password2') }}</span>
      </div>
      <div class="controls">
        <!-- <input name="m1" type="checkbox" v-model="isChecked"> -->
        <input type="checkbox"
        v-model="isChecked" name="isChecked" v-validate="{agree:true}" 
        :class="{invalid: errors.has('isChecked')}">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <!-- <span class="error-msg">错误提示信息</span> -->
        <span class="error-msg">{{ errors.first('isChecked') }}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      phone:'',       //手机号
      code:'',        //验证码
      password:'',    //密码
      password2:'',   //验证密码是否相同
      isChecked:true, //协议  
      codeText:'获取验证码',    //获取验证码按钮的文字
      isClickCode:true,       //是否能点击获取验证码
    }
  },

  methods: {
    //用于获取验证码
    async getCode(){
      //判断phone是否为手机号的正则表达式
      let pattern = /^1[34578]\d{9}$/
      if(pattern.test(this.phone)){//手机号格式正确，进入判断
        try {
          //发送请求获取验证码
          const result = await this.$store.dispatch('getCode',this.phone)
          //将获取的验证码赋值给data中的code
          this.code = result
          //获取成功提示
          this.$message.success('验证码获取成功')
          //再次可点击的按钮时间
          let num = 60
          //开启定时器，倒计时，并将按钮变为不可用
          let timer = setInterval( () =>{
            //按钮不可用
            this.isClickCode =false
            this.codeText = num + '秒后重新获取'
            num--
            if (num <= 0) {//60s结束，可重新获取验证码
              this.codeText = '重新获取验证码'
              //按钮可用
              this.isClickCode =true
              //清除定时器
              clearInterval(timer)
            }
          }, 1000)
        } catch (error) {
          alert('错误原因：'+error.message)
        }
      }
      else{
        this.$message.error('请输入正确的手机号')
      }
    },

    //用于注册用户
    async register(){
      const success = await this.$validator.validateAll() // 对所有表单项进行验证
      if(success){
        let {phone,password,password2,code} = this
        //判断表单是否有值或正确
        // if(phone&&password&&password2&&code&&password2===password){
          try {
            //调用user中actions发送请求
            await this.$store.dispatch('userRegister',{phone,password,code})
            alert('注册成功')
            //跳转至登录页面
            this.$router.push('/login')
          } catch (error) {
            alert('错误原因：'+error.message)
          }
        // }
      }
    }
  },
}
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>
