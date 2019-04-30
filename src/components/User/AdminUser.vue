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
            <!--<label class="control-label">登录名</label>-->
            <!--<input type="text" class="form-control" v-model.trim="condition['username']">-->

            <label class="control-label">姓名</label>
            <input type="text" class="form-control" v-model.trim="condition['user_name']">

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
            <td>{{ item.login_name }}</td>
            <td>{{ item.user_name }}</td>
            <td>{{ item.user_phone }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.ip }}</td>
            <td>{{ item.last_login_time }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#Modal" @click="edit(item)">编辑</button>
              <button v-if="user.login_name == 'admin'" type="button" class="btn btn-sm btn-warning" data-toggle="modal" data-target="#Modal2" @click="editPassword(item)">更改密码</button>
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
            <h4 class="modal-title">{{ form.id ? '修改用户信息' : '新增用户' }}</h4>
          </div>


          <form id="form" class="form-horizontal" @submit.prevent="submit">
            <div class="modal-body">
              <div class="row">

                <div class="form-group">
                  <label class="col-sm-3 control-label">登录名</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true"
                           oninput="NonSpecialSymbolsFormat(this)" name="login_name" v-model.trim="form.login_name" :disabled="form.id">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">姓名</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" name="user_name" v-model.trim="form.user_name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">手机号码</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" maxlength="11"
                           oninput="numberFormat(this)" name="user_phone" v-model="form.user_phone">
                  </div>
                </div>

                <!--<div class="form-group">-->
                  <!--<label class="col-sm-3 control-label">账号状态</label>-->
                  <!--<div class="col-sm-8">-->
                    <!--<input type="text" class="form-control" required="" aria-required="true" name="status" v-model.trim="form.status">-->
                  <!--</div>-->
                <!--</div>-->

                <template v-if="!form.id">
                  <div class="form-group">
                    <label class="col-sm-3 control-label">初始密码</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" required="" aria-required="true"
                             oninput="NonSpecialSymbolsFormat(this)" name="password" v-model="form.password">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">确认密码</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" required="" aria-required="true"
                             oninput="NonSpecialSymbolsFormat(this)" name="confirmPassword" v-model="form.confirmPassword">
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

    <!-- model -->
    <div class="modal inmodal fade" id="Modal2" tabindex="-1" role="dialog"  aria-hidden="true">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">修改密码</h4>
          </div>


          <form id="form2" class="form-horizontal" @submit.prevent="submit2">
            <div class="modal-body">
              <div class="row">

                <div class="form-group">
                  <label class="col-sm-3 control-label">原密码</label>
                  <div class="col-sm-8">
                    <input type="password" class="form-control" required="" aria-required="true"
                           oninput="NonSpecialSymbolsFormat(this)" name="old_password" v-model="form2.old_password">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">密码</label>
                  <div class="col-sm-8">
                    <input type="password" class="form-control" required="" aria-required="true"
                           oninput="NonSpecialSymbolsFormat(this)" name="new_password" v-model="form2.new_password">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">确认密码</label>
                  <div class="col-sm-8">
                    <input type="password" class="form-control" required="" aria-required="true"
                           oninput="NonSpecialSymbolsFormat(this)" name="new_password2" v-model="form2.new_password2">
                  </div>
                </div>

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
  name: 'AdminUser',
  data () {
    return {
      user: this.$store.getters.getUser,
      tableOptions: [
        { key: "id", title: "ID" },
        { key: "login_name", title: "登录名" },
        { key: "user_name", title: "姓名" },
        { key: "user_phone", title: "手机号码" },
        { key: "status", title: "用户状态" },
        { key: "ip", title: "登录ip" },
        { key: "last_login_time", title: "登录时间" }
      ],
      items: [],
      total: 0,
      page: 1,
      pageSize: this.$Config.page_size,
      condition: {},
      form: {},
      validate: null,
      form2: {},
      validate2: null,
      editPasswordUser: {},
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

      this.$Service.AdminUser.get(condition).then(response => {
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
      this.isSubmit = false
      $('#Modal').modal('hide')
    },
    add () {
      this.clear()
    },
    checkForm (form) {
      if (form.user_phone.length != 11) {
        toastr.info('请输入11位数的电话号码!')
        return false
      }
      if (form.password && (form.password == Number(form.password) || form.password.length < 6)) {
        toastr.info('请输入6位以上的字母加数字的密码')
        return
      }
      if (form.password && form.confirmPassword && form.password != form.confirmPassword) {
        toastr.info('两次输入的密码不一致!')
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
        user_name: this.form.user_name,
        user_phone: this.form.user_phone
      }
      if (this.form.password) {
        request.password = this.form.password
      }
      request.role_id = 0
      request.user_type = 2

      if (this.form.id) { // 修改
        request.login_name = this.form.login_name
        this.$Service.AdminUser.edit(request).then(response => {
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
        request.mch_id = this.user.mch_id
        this.$Service.AdminUser.add(request).then(response => {
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
        login_name: item.login_name,
        user_name: item.user_name,
        user_phone: item.user_phone
      }
    },
    del (item) {
      this.$Service.AdminUser.del({ login_name: item.login_name }).then(response => {
        if (response.err_code == 0) {
          toastr.success('删除成功')
          this.getDataTables()
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })
    },
    editPassword (item) {
      this.form2 = {}
      this.editPasswordUser = item
    },
    submit2 () {
      if (this.form2.new_password != this.form2.new_password2) {
        toastr.info('两次输入的密码不一致!')
        return
      }
      const request = {
        login_name: this.editPasswordUser.login_name,
        old_password: this.form2.old_password,
        new_password: this.form2.new_password
      }
      this.$Service.AdminUser.editPassword(request).then(response => {
        if (response.err_code == 0) {
          toastr.success('密码修改成功')
          $('#Modal2').modal('hide')
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })
    }
  },
  created () {
    this.getDataTables()
  },
  mounted () {
    this.validate = this.$H5UI.validate('#form')  //  添加表单验证
    this.validate2 = this.$H5UI.validate('#form2')  //  添加表单验证
  }
}
</script>

<style scoped>
</style>
