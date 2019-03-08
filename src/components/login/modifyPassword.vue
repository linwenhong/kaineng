<template>
  <div class=" text-center loginscreen  animated fadeInDown modify">
    <div class="row mt">
      <h1>修改{{ name }}密码</h1>
      <form class="m-t form-horizontal middle-box">
        <div class="form-group">
          <label class="control-label col-sm-3">修改密码</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" required="" v-model="password">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-3">确认密码</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" required="" v-model="confirmPassword">
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-3 col-sm-9">
            <b class="btn btn-primary block full-width" @click="confirm()">确定</b>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BaseService from '@/assets/service/base-service'
export default {
  name: 'modifyPassword',
  data () {
    return {
      id: this.$route.params['id'],     // 合同id
      name: this.$route.query['name'],
      password: null,
      confirmPassword: null
    }
  },
  methods: {
    confirm () {
      if (!this.password || !this.confirmPassword) {
        return
      }
      if (this.password != this.confirmPassword) {
        toastr.error('两次输入的密码不同', '修改失败')
        return
      } else {
        const id = this.id ? this.id : JSON.parse(localStorage.getItem('user')).id
        BaseService.put('auth/change_password', {
            id: id,
            password: this.password
          }).then(response => {
            if (response.data.code == 200) {
              toastr.success('密码已重置', '修改成功')
            }
          })
      }
    }
  }
}
</script>

<style scoped>
  .mt{
    margin: 100px 0 0;
  }
  .mt h1{
    font-weight: bold;
  }
  .modify {
    position: relative;
  }
</style>
