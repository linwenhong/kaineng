<template>
  <div class="text-center loginscreen  animated fadeInDown login">
      <h2 class="title">商户注册</h2>
      <div class="form-horizontal middle-box">
        <form class="form-horizontal" @submit.prevent="register" id="form">
          <div class="form-group">
            <label class="control-label"><span class="MustFill">*</span>商户名称</label>
            <input type="text" class="form-control"  required="" aria-required="true"  name="mch_name" v-model.trim="form.mch_name">
          </div>

          <div class="form-group">
            <label class="control-label"><span class="MustFill">*</span>商户联系电话</label>
            <input type="text" class="form-control" required="" aria-required="true" maxlength="11"
                   oninput="numberFormat(this)" name="mobile" v-model="form.mobile">
          </div>

          <div class="form-group">
            <label class="control-label"><span class="MustFill">*</span>管理员登录名</label>
            <input type="text" class="form-control" required="" aria-required="true" maxlength="12"
                   oninput="NonSpecialSymbolsFormat(this)" name="login_name" v-model="form.login_name">
          </div>

          <div class="form-group">
            <label class="control-label"><span class="MustFill">*</span>管理员姓名</label>
            <input type="text" class="form-control"  required="" aria-required="true"  name="user_name" v-model.trim="form.user_name">
          </div>

          <div class="form-group">
            <label class="control-label"><span class="MustFill">*</span>管理员联系电话</label>
            <input type="text" class="form-control" required="" aria-required="true" maxlength="11"
                   oninput="numberFormat(this)" name="user_phone" v-model="form.user_phone">
          </div>

          <div class="form-group">
            <label class="control-label"><span class="MustFill">*</span>密码</label>
            <input type="password" class="form-control" required="" aria-required="true"
                   oninput="NonSpecialSymbolsFormat(this)" name="password" v-model="form.password">
          </div>
          <div class="form-group">
            <label class="control-label"><span class="MustFill">*</span>确认密码</label>
            <input type="password" class="form-control" required="" aria-required="true"
                   oninput="NonSpecialSymbolsFormat(this)" name="password2" v-model="password">
          </div>
          <div class="submit">
            <button type="submit" class="btn btn-primary block full-width">注册</button>
            <b class="btn btn-white block full-width" @click="cancel">返回登录页</b>
          </div>
        </form>
      </div>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'register',
  data () {
    return {
      password: '',
      form: {},
      canSubmit: true,
      validate: null
    }
  },
  mounted () {
    this.validate = this.$H5UI.validate('#form')  //  添加表单验证
  },
  methods: {
    cancel () {
      this.$router.push('/login')
      return
    },
    register () {
      if (!this.canSubmit) return
      if (!$('#form').valid()) {
        toastr.info('请补充完善数据后提交')
        return
      }
      if (!this.form.mobile || (this.form.mobile && this.form.mobile.length != 11)) {
        toastr.info('请输入11位数的电话号码')
        return
      }
      if (!this.form.user_phone || (this.form.user_phone && this.form.user_phone.length != 11)) {
        toastr.info('请输入11位数的电话号码')
        return
      }
      if (this.form.password == Number(this.form.password) || this.form.password.length < 6) {
        toastr.info('请输入6位以上的字母加数字的密码')
        return
      }
      if (this.password != this.form.password) {
        toastr.info('两次输入的密码不一致')
        return
      }
      this.canSubmit = false

      const request = {
        login_name: this.form.login_name,
        mch_name: this.form.mch_name,
        mobile: this.form.mobile,
        password: this.form.password,
        user_name: this.form.user_name,
        user_phone: this.form.user_phone
      }

      this.$Service.Merchant.add(request).then(response => {
        if (response.err_code == 0) {
          toastr.success('注册成功')
          setTimeout(() => this.$router.push('/login'), 1000)
        } else {
          this.canSubmit = true
          toastr.error(response.err_msg, response.err_code)
        }
      }).catch(error => {
        this.canSubmit = true
      })
    }
  }
}
</script>

<style scoped>
  .title {
    margin-top: 100px;
    font-weight: bold;
    font-size: 35px;
  }
  #form {
    width: 480px;
    background-color: #fff;
    border-radius: 8px;
    padding: 30px;
  }
  #form label {
    width: 100px;
    margin-right: 15px;
  }
  #form input {
    display: inline-block;
    width: 250px;
  }
  .submit {
    margin-left: 100px;
    width: 250px;
  }
  .submit b {
    margin-top: 15px;
  }
</style>
