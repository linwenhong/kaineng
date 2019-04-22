<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>修改密码</h5>
      </div>

      <div class="ibox-content">
        <form class="form-horizontal" @submit.prevent="submit">

          <div class="form-group">
            <div class="col-sm-6">
              <label class="col-sm-4 control-label">原密码</label>
              <div class="col-sm-8">
                <input type="password" class="form-control" required="" aria-required="true"
                       oninput="NonSpecialSymbolsFormat(this)" name="old_password" v-model="form.old_password">
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-6">
              <label class="col-sm-4 control-label">新密码</label>
              <div class="col-sm-8">
                <input type="password" class="form-control" required="" aria-required="true"
                       oninput="NonSpecialSymbolsFormat(this)" name="new_password" v-model="form.new_password">
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-6">
              <label class="col-sm-4 control-label">确认密码</label>
              <div class="col-sm-8">
                <input type="password" class="form-control" required="" aria-required="true"
                       oninput="NonSpecialSymbolsFormat(this)" name="new_password2" v-model="form.new_password2">
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
    name: 'modifyPassword',
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
        if (this.form.new_password != this.form.new_password2) {
          toastr.info('两次输入的密码不一致!')
          return
        }
        const request = {
          login_name: this.user.login_name,
          old_password: this.form.old_password,
          new_password: this.form.new_password
        }
        if (this.identity == 1) {
          this.$Service.User.editPassword(request).then(response => {
            if (response.err_code == 0) {
              toastr.success('密码修改成功')
            } else {
              toastr.error(response.err_msg, response.err_code)
            }
          })
        }
        if (this.identity == 2) {
          this.$Service.AdminUser.editPassword(request).then(response => {
            if (response.err_code == 0) {
              toastr.success('密码修改成功')
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
