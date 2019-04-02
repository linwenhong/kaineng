<template>
  <div>
    <div class="text-center animated fadeInDown login">
      <div class="row mt">
        <h1>自动售货机<small> (后台管理系统)</small></h1>
        <div class="m-t form-horizontal middle-box">
          <form class="form-horizontal" @submit.prevent="login" v-show="!isCodeLogin">
            <div class="form-group">
              <label class="control-label col-sm-3">账号</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="username">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-3">密码</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" v-model="password">
              </div>
            </div>
            <div class="col-sm-offset-3 col-sm-9">
              <button type="submit" class="btn btn-primary block full-width">登 录</button>

              <div class="text-left option">
                <a @click="isCodeLogin = true">扫码登录</a>
              </div>
              <div class="text-right option">
                <a @click="register()">去注册？</a>
              </div>
            </div>
          </form>

          <div v-show="isCodeLogin" class="code_box">
            <div id="qrcode"></div>
            <div class="text-center">
              <a @click="isCodeLogin = false">账号密码登录</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'admin_login',
  data () {
    return {
      isCodeLogin: false,
      username: null,
      password: null,
      access_token: null,
      Interval: null
    }
  },
  created () {
    localStorage.clear()
    this.getLoginCode()
  },
  methods: {
    getLoginCode () {
      this.$Service.AdminAuth.loginCode().then(response => {
        if (response.qr_code && response.access_token) {
          new QRCode("qrcode", {
            text: response.qr_code,
            width: 240,
            height: 240,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
          });
        }
        this.access_token = response.access_token
        this.Interval = setInterval(() => {
          if (this.isCodeLogin) {
            this.codeLogin()
          }
        }, 1000)
      })
    },
    codeLogin () {
      this.$Service.AdminAuth.codeLogin({
        access_token: this.access_token
      }).then(response => {
        if (!response.err_code) {
          clearInterval(this.Interval)
          this.$store.dispatch('identity', 2)
          this.$store.dispatch('login', response)
        }
      })
    },
    login () {
      if (!this.username || !this.password) {
        toastr.error('用户名或密码不能为空!')
      } else {
        const request = {
          login_name: this.username,
          password: this.password
        }
        this.$Service.AdminAuth.login(request).then(response => {
          if (response.err_code) {
            toastr.error(response.err_msg, response.err_code)
          } else {
            this.$store.dispatch('identity', 2)
            this.$store.dispatch('login', response)
          }
        })

      }
    }
  }
}
</script>

<style scoped>
.mt{
  margin-top: 200px;
}
.mt h1{
  font-weight: bold;
}
.login{
  position: relative;
  padding: 3rem;
  height: calc(100vh - 25px);
  background-repeat: no-repeat;
  font-size: 16px;
  color:#000
}
footer {
  height: 24px;
  line-height: 24px;
  border-top: 1px solid #999;
  background-color: #fff;
  text-align: center;
}
.option {
  width: 50%;
  float: left;
}
.code_box {
  width: 300px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
}
#qrcode {
  width: 240px;
  height: 240px;
}
</style>
