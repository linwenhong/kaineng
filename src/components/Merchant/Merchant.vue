<template>
  <div class="wrapper wrapper-content">

    <page-header-button @add="add"></page-header-button>

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>用户管理</h5>
      </div>

      <div class="ibox-content">
        <div class="search-page">
          <div class="form-group">
            <label class="control-label">商户名称</label>
            <input type="text" class="form-control" v-model.trim="condition['mch_name']">

            <button type="button" class="btn btn-primary search" @click="getDataTables()">查询</button>
          </div>
        </div>

        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th v-for="option of tableOptions">{{ option.title }}</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) of items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.user_name }}</td>
            <td>{{ item.user_phone }}</td>
            <td>{{ item.mch_name }}</td>
            <td>{{ item.mobile }}</td>
            <td>{{ item.user_type_name }}</td>
            <td>{{ item.account_name }}</td>
            <td>{{ item.bank_name }}</td>
            <td>{{ item.bank_no }}</td>
            <td>{{ item.wechat_id }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#Modal" @click="edit(item)">编辑</button>
              <info-confirm @confirm="del" :data="item"></info-confirm>
            </td>
          </tr>
          </tbody>
        </table>
        <vue-pagination :current-page="page" :total="total" :page-size="pageSize" @current-change="pageChange" theme="gray"></vue-pagination>

      </div>
    </div>

    <!-- model -->
    <div class="modal inmodal fade" id="Modal" tabindex="-1" role="dialog"  aria-hidden="true">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">{{ form.id ? '修改商户信息' : '新增商户' }}</h4>
          </div>

          <form id="form" class="form-horizontal" @submit.prevent="submit">
            <div class="modal-body">
              <div class="row">

                <div class="form-group">
                  <label class="col-sm-3 control-label">管理员登录名</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true"
                           oninput="NonSpecialSymbolsFormat(this)" name="login_name" v-model.trim="form.login_name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">管理员姓名</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" name="user_name" v-model.trim="form.user_name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">管理员电话</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" maxlength="11"
                           oninput="numberFormat(this)" name="user_phone" v-model="form.user_phone">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">商户名称</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" name="mch_name" v-model.trim="form.mch_name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">商户联系电话</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" maxlength="11"
                           oninput="numberFormat(this)" name="mobile" v-model="form.mobile">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">结算账户姓名</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" name="account_name" v-model.trim="form.account_name">
                  </div>
                </div>

                <template v-if="form.id">
                  <div class="form-group">
                    <label class="col-sm-3 control-label">结算微信号</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="wechat_id" v-model.trim="form.wechat_id">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">银行卡开户支行</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="bank_name" v-model.trim="form.bank_name">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">银行卡号</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="bank_no" v-model.trim="form.bank_no">
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">结算微信号</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" name="wechat_id" v-model.trim="form.wechat_id">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">银行卡开户支行</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" name="bank_name" v-model.trim="form.bank_name">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">银行卡号</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" name="bank_no" v-model.trim="form.bank_no">
                    </div>
                  </div>
                </template>


                <template v-if="!form.id">
                  <div class="form-group">
                    <label class="col-sm-3 control-label">密码</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" required="" aria-required="true"
                             oninput="NonSpecialSymbolsFormat(this)" name="password" v-model.trim="form.password">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">确认密码</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" required="" aria-required="true"
                             oninput="NonSpecialSymbolsFormat(this)" name="confirmPassword" v-model.trim="password">
                    </div>
                  </div>
                </template>

              </div>
            </div>

            <div class="modal-footer">
              <b class="btn btn-white" data-dismiss="modal">关闭</b>
              <button type="submit" class="btn btn-primary">提交</button>
            </div>
          </form>

        </div>
      </div>
    </div>
    <!-- model end -->

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Merchant',
  data () {
    return {
      tableOptions: [
        { key: "id", title: "ID" },
        { key: "user_name", title: "管理员名称" },
        { key: "user_phone", title: "管理员电话" },
//        { key: "status", title: "商户状态" },
        { key: "mch_name", title: "商户名称" },
        { key: "mobile", title: "商户联系电话" },
        { key: "user_type_name", title: "账户类型" },
        { key: "account_name", title: "结算账户姓名" },
        { key: "bank_name", title: "开户支行" },
        { key: "bank_no", title: "银行卡号" },
        { key: "wechat_id", title: "微信号" }
      ],
      items: [],
      total: 0,
      page: 1,
      pageSize: this.$Config.page_size,
      condition: {},
      form: {},
      password: null,
      validate: null,
      isSubmit: false
    }
  },
  methods: {
    getDataTables (page = 1) {
      const condition = {
        page_no: page,
        page_size: this.pageSize
      }

      for (const key in this.condition) {
        if (this.condition[key]) {
          condition[key] = this.condition[key]
        }
      }

      this.$Service.Merchant.get(condition).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          this.items = response.list
          this.total = response.total
          this.$nextTick(() => this.$H5UI.iCheck())
        }
      })
    },
    pageChange (page) {
      this.getDataTables(page)
    },
    clear () {
      this.$H5UI.reset(this.validate)
      this.form = {}
      this.password = null
      this.isSubmit = false
      $('#Modal').modal('hide')
    },
    add () {
      this.clear()
    },
    checkForm (form) {
      if (form.mobile.length != 11) {
        toastr.info('请输入11位数的电话号码!')
        return false
      }
      if (form.user_phone.length != 11) {
        toastr.info('请输入11位数的电话号码!')
        return false
      }
      if (form.bank_name && !form.bank_no || !form.bank_name && form.bank_no) {
        toastr.info('"开户支行"与"银行卡号"为共存关系, 只可都填或都不填!')
        return false
      }
      if (form.password && (form.password == Number(form.password) || form.password.length < 6)) {
        toastr.info('请输入6位以上的字母加数字的密码')
        return
      }
      if (form.password && form.password != this.password) {
        toastr.info('两次输入的密码不同!')
        return false
      }
      return true
    },
    submit () {
      if (this.isSubmit) return;  // 防止多次提交
      if (!$('#form').valid()) return;  // 必填验证
      if (!this.checkForm(this.form)) return;  // 表单验证
      this.isSubmit = true

      const request = {
        account_name: this.form.account_name,
        mch_name: this.form.mch_name,
        mobile: this.form.mobile
      }
      if (this.form.wechat_id) {
        request.wechat_id = this.form.wechat_id
      }
      if (this.form.bank_name) {
        request.bank_name = this.form.bank_name
        request.bank_no = this.form.bank_no
      }

      if (this.form.id) { // 修改
        request.mch_id = this.form.mch_id
        this.$Service.Merchant.edit(request).then(response => {
          this.isSubmit = false
          if (response.err_code == 0) {
            toastr.success('修改成功')
            this.getDataTables(this.page)
            $('#Modal').modal('hide')
          } else {
            toastr.error(response.err_msg, response.err_code)
          }
        })
      } else {  // 新增
        request.login_name = this.form.login_name
        request.password = this.form.password
        request.user_name = this.form.user_name
        request.user_phone = this.form.user_phone
        this.$Service.Merchant.add(request).then(response => {
          this.isSubmit = false
          if (response.err_code == 0) {
            toastr.success('新增成功')
            this.getDataTables()
            $('#Modal').modal('hide')
          } else {
            toastr.error(response.err_msg, response.err_code)
          }
        })
      }

    },
    edit (item) {
      this.clear()
      this.form = {
        id: item.id,
        mch_id: item.mch_id,
        account_name: item.account_name,
        login_name: item.login_name,
        mch_name: item.mch_name,
        mobile: item.mobile,
        user_name: item.user_name,
        user_phone: item.user_phone,

        wechat_id: item.wechat_id,
        bank_name: item.bank_name,
        bank_no: item.bank_no
      }
    },
    del (item) {
      this.$Service.Merchant.del({ id: item.id }).then(response => {
        if (response.err_code == 0) {
          toastr.success('删除成功')
          this.getDataTables()
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })
    },
    EnabledTest () {
      $('#Modal').modal('show')
      this.form = {
        account_name: '这是一个结算户名',
        login_name: 'login_name_test',
        mch_name: '一点点',
        mobile: '15478855447',
        password: 'test123',
        user_name: '测试用户',
        user_phone: '18312553218'
      }
      this.form.wechat_id = 'wechat15478855445'
      this.form.bank_name = '中国银行'
      this.form.bank_no = '6216665000001788266'
      this.password = 'test123'
      this.submit()
    }
  },
  created () {
    this.getDataTables()
  },
  mounted () {
    this.validate = this.$H5UI.validate('#form')  //  添加表单验证
//    this.EnabledTest()
  }
}
</script>

<style scoped>
</style>
