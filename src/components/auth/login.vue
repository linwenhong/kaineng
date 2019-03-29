<template>
  <div>
    <div class="text-center animated fadeInDown login">
      <div class="row mt">
        <h1>自动售货机<small> (后台管理系统)</small></h1>
        <div class="m-t form-horizontal middle-box">
          <form class="form-horizontal" @submit.prevent="login">
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

              <p class="text-center">
                <a @click="register()">去注册？</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import Cache from '@/assets/cache'
export default {
  name: 'login',
  data () {
    return {
      username: null,
      password: null
    }
  },
  created () {
    localStorage.clear()
    this.$Service.Auth.qrCode().then(response => {
      console.log(response)
    })
  },
  methods: {
    login () {
      if (!this.username || !this.password) {
        toastr.error('用户名或密码不能为空!')
      } else {
        const request = {
          login_name: this.username,
          password: this.password
        }
        this.$Service.Auth.login(request).then(response => {
          if (response.err_code) {
            toastr.error(response.err_msg, response.err_code)
          } else {
            this.$store.dispatch('login', response)
          }
        })

      }
    },
    register () {
      this.$router.push('/register')
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
</style>
