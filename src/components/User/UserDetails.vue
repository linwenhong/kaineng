<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>修改个人信息</h5>
      </div>

      <div class="ibox-content">
        <form class="form-horizontal" @submit.prevent="submit">

          <div class="form-group">
            <div class="col-sm-6">
              <label class="col-sm-4 control-label">姓名</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" required="" aria-required="true" name="user_name" v-model.trim="form.user_name">
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-6">
              <label class="col-sm-4 control-label">手机号</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" required="" aria-required="true" maxlength="11"
                       oninput="numberFormat(this)" name="user_phone" v-model="form.user_phone">
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-6">
              <div class="text-center">
                <button type="submit" class="btn btn-primary">保存</button>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import Cache from '@/assets/cache'
export default {
  name: 'UserDetails',
  data () {
    return {
      user: this.$store.getters.getUser,
      identity: this.$store.getters.getIdentity,
      id: this.$route.params['id'],
      form: {},
      validate: null,
      isSubmit: false
    }
  },
  methods: {
    submit () {
      if (!this.form.user_name) {
        toastr.info('请输入姓名!')
        return false
      }
      if (this.form.user_phone.length != 11) {
        toastr.info('请输入11位数的电话号码!')
        return false
      }
      const request = {
        login_name: this.user.login_name,
        user_type: this.user.user_type,
        role_id: 0,
        user_name: this.form.user_name,
        user_phone: this.form.user_phone
      }
      if (this.identity == 1) {
        this.$Service.User.edit(request).then(response => {
          if (response.err_code == 0) {
            toastr.success('修改成功')
          } else {
            toastr.error(response.err_msg, response.err_code)
          }
        })
      }
      if (this.identity == 2) {
        this.$Service.AdminUser.edit(request).then(response => {
          if (response.err_code == 0) {
            toastr.success('修改成功')
            this.form = {}
          } else {
            toastr.error(response.err_msg, response.err_code)
          }
        })
      }
    }
  },
  created () {

  },
  mounted () {
    this.validate = this.$H5UI.validate('#form')  //  添加表单验证
  }
}
</script>

<style scoped>
  .btn {
    margin-bottom: 0;
  }
  label.title {
    font-size: 18px;
    font-weight: bold;
  }
</style>
