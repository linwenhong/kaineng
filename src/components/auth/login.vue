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
                <input type="text" class="form-control"  required="" v-model="username">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-3">密码</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" required="" v-model="password">
              </div>
            </div>
            <div class="col-sm-offset-3 col-sm-9">
              <button type="submit" class="btn btn-primary block full-width">登 录</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!--<footer>-->
      <!--快递查询友情链接：<a href="https://m.kuaidi100.com/" target="_blank">快递查询</a>-->
    <!--</footer>-->
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import Cache from '@/assets/cache'
import { API_URL } from '@/assets/config'
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
  },
  methods: {
    login () {
      if (!this.username || !this.password) {
        toastr.error('用户名或密码不能为空!')
      } else {
        const requset = {
          username: this.username,
          password: this.password
        }
        Vue.http.post(this.$Config.api_url + 'login', requset)
          .then(response => {
            const data = response.data.data
            if (response.data.status == 200) {
              Cache.setLocalStorage('token', data.token)
              Cache.setLocalStorage('user', data)
              this.$router.push({ path: '/admin/user/' + data.id })
            } else if (response.data.status == 500) {
              toastr.error(response.data.msg)
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
</style>
