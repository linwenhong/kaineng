<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>商户信息</h5>
      </div>

      <div class="ibox-content">
        <form class="form-horizontal" @submit.prevent="submit">

          <template v-if="canShow">
            <h3>商户信息</h3>
            <div class="form-group">
              <label class="control-label">商户名称:</label>
              <input type="text" class="form-control" v-model="form.name">
            </div>

            <div class="form-group">
              <label class="control-label">商户联系电话:</label>
              <input type="text" class="form-control" v-model="form.phone">
            </div>

            <h3>结算账户信息</h3>
            <div class="form-group">
              <label class="control-label">结算账户类型:</label>
              <input type="text" class="form-control" v-model="form.type">
            </div>

            <div class="form-group">
              <label class="control-label">账户姓名:</label>
              <input type="text" class="form-control" v-model="form.bank_user_name">
            </div>

            <div class="form-group">
              <label class="control-label">账户号:</label>
              <input type="text" class="form-control" v-model="form.bank_id">
            </div>
          </template>
          <template v-else>
            <h3>商户信息</h3>
            <div class="form-group">
              <label class="control-label">商户名称:</label>
              <p>{{ form.name }}</p>
            </div>
            <div class="form-group">
              <label class="control-label">商户联系电话:</label>
              <p>{{ form.phone }}</p>
            </div>

            <h3>结算账户信息</h3>
            <div class="form-group">
              <label class="control-label">结算账户类型:</label>
              <p>{{ form.type }}</p>
            </div>
            <div class="form-group">
              <label class="control-label">账户姓名:</label>
              <p>{{ form.bank_user_name }}</p>
            </div>
            <div class="form-group">
              <label class="control-label">账户号:</label>
              <p>{{ form.bank_id }}</p>
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
      id: this.$route.params['id'],
      form: {},
      canShow: false
    }
  },
  methods: {
    submit () {
      console.log(this.form)
      this.canShow = false
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
