<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>商户信息</h5>
      </div>

      <div class="ibox-content">
        <form id="form" class="form-horizontal" @submit.prevent="submit">

          <template v-if="canShow">
            <h3>商户信息</h3>
            <div class="form-group">
              <label class="control-label">商户名称:</label>
              <input type="text" class="form-control" required="" aria-required="true"
                     name="mch_name" v-model.trim="form.mch_name">
            </div>

            <div class="form-group">
              <label class="control-label">商户联系电话:</label>
              <input type="text" class="form-control" required="" aria-required="true" maxlength="11"
                     oninput="numberFormat(this)" name="mobile" v-model="form.mobile">
            </div>

            <h3>结算账户信息</h3>
            <!--<div class="form-group">-->
              <!--<label class="control-label">结算账户类型:</label>-->
              <!--<input type="text" class="form-control" v-model="form.user_type_name">-->
            <!--</div>-->

            <div class="form-group">
              <label class="control-label">结算账户姓名:</label>
              <input type="text" class="form-control" required="" aria-required="true"
                     name="account_name" v-model.trim="form.account_name">
            </div>

            <div class="form-group">
              <label class="control-label">开户银行支行:</label>
              <input type="text" class="form-control" aria-required="true"
                     name="bank_name"  v-model.trim="form.bank_name">
            </div>

            <div class="form-group">
              <label class="control-label">银行卡号:</label>
              <input type="text" class="form-control" aria-required="true"
                     name="bank_no" v-model.trim="form.bank_no">
            </div>

            <div class="form-group">
              <label class="control-label">微信号:</label>
              <input type="text" class="form-control" required="" aria-required="true"
                     name="wechat_id" v-model.trim="form.wechat_id">
            </div>
          </template>
          <template v-else>
            <h3>商户信息</h3>
            <div class="form-group">
              <label class="control-label">商户名称:</label>
              <p>{{ form.mch_name }}</p>
            </div>
            <div class="form-group">
              <label class="control-label">商户联系电话:</label>
              <p>{{ form.mobile }}</p>
            </div>

            <h3>结算账户信息</h3>
            <div class="form-group">
              <label class="control-label">结算账户姓名:</label>
              <p>{{ form.account_name }}</p>
            </div>
            <div class="form-group">
              <label class="control-label">开户银行支行:</label>
              <p>{{ form.bank_name }}</p>
            </div>
            <div class="form-group">
              <label class="control-label">银行卡号:</label>
              <p>{{ form.bank_no }}</p>
            </div>
            <div class="form-group">
              <label class="control-label">微信号:</label>
              <p>{{ form.wechat_id }}</p>
            </div>
          </template>


          <div class="form-group">
            <div class="text-center">
              <b v-if="!canShow" class="btn btn-info" @click="restart">修改</b>
              <b v-if="canShow" class="btn btn-white" @click="cancelRestart">取消</b>
              <button v-if="canShow" type="submit" class="btn btn-primary">保存</button>
            </div>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'MerchantDetails',
  data () {
    return {
      user: this.$store.getters.getUser,
      form: {},
      validate: null,
      isSubmit: false,
      canShow: false
    }
  },
  methods: {
    checkForm (form) {
      if (form.mobile.length != 11) {
        toastr.info('请输入11位数的电话号码!')
        return false
      }
      return true
    },
    submit () {
      if (this.isSubmit) return;  // 防止多次提交
      if (!$('#form').valid()) return;  // 必填验证
      if (!this.checkForm(this.form)) return;  // 表单验证
      this.isSubmit = true
      this.canShow = false

      const request = {
        mch_id: this.form.mch_id,
        account_name: this.form.account_name,
        bank_name: this.form.bank_name,
        bank_no: this.form.bank_no,
        mch_name: this.form.mch_name,
        mobile: this.form.mobile,
        wechat_id: this.form.wechat_id,
      }

      this.$Service.Merchant.edit(request).then(response => {
        this.isSubmit = false
        if (response.err_code == 0) {
          toastr.success('修改成功')
          this.$H5UI.reset(this.validate)
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })
    },
    restart () {
      this.canShow = true
    },
    cancelRestart () {
      this.canShow = false
    }
  },
  created () {

  },
  mounted () {
    this.validate = this.$H5UI.validate('#form')  //  添加表单验证
    this.$Service.Merchant.details({ mch_id: this.user.mch_id }).then(response => {
      this.form = response
    })
  }
}
</script>

<style scoped>
  .btn {
    margin-bottom: 0;
  }
  label.control-label {
    width: 100px;
    float: left;
    margin-left: 50px;
    margin-right: 15px;
  }
  p {
    line-height: 34px;
    margin-bottom: 0;
  }
  input {
    display: inline-block;
    width: 200px;
  }
  .text-center {
    width: 500px;
  }
  form {
    width: 600px;
    margin-left: 100px;
  }
</style>
