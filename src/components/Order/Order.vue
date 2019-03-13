<template>
  <div class="wrapper wrapper-content">

    <page-header-button @add="add"></page-header-button>

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>订单管理</h5>
      </div>

      <div class="ibox-content">
        <div class="search-page">
          <div class="form-group">

          </div>

          <div class="form-group">
            <label class="control-label">商户名</label>
            <input type="text" class="form-control" v-model.trim="condition['merchant_name']">

            <date-time text="下单时间"></date-time>

            <label class="control-label">支付类型</label>
            <select class="form-control" v-model="condition['pay_type']">
              <option value="9">微信</option>
              <option value="10">支付宝</option>
            </select>

            <label class="control-label">订单号</label>
            <input type="text" class="form-control" v-model.trim="condition['coding']">

            <button type="button" class="btn btn-primary search" @click="getDataTables()">查询</button>
          </div>
        </div>

        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>订单号</th>
              <th>商户名</th>
              <th v-for="option of tableOptions">{{ option.title }}</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) of items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.coding }}</td>
            <td>{{ item.merchant.name }}</td>
            <td v-for="option of tableOptions">
              <template v-if="option.template">
                  <div v-html="getHtml(option)"></div>
              </template>
              <template v-else>{{ item[option.key] }}</template>
            </td>
            <td>
              <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#Modal" @click="edit(item)">编辑</button>
              <info-confirm @confirm="del" :data="item">删除</info-confirm>
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
          <div class="modal-body">
            <form id="form" class="form-horizontal" @submit.prevent="submit">
              <div class="row">

                <div class="form-group">
                  <label class="col-sm-3 control-label">登录名</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" name="username" v-model.trim="form.username">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">姓名</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" name="name" v-model.trim="form.name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">手机号码</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" name="phone" v-model="form.phone"
                           maxlength="11" oninput="this.value=this.value.replace(/[^\d.]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d.]/g,'')" >
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">邮箱</label>
                  <div class="col-sm-8">
                    <input type="email" class="form-control" required="" aria-required="true" name="email" v-model.trim="form.email">
                  </div>
                </div>

                <template v-if="form.id">
                  <div class="form-group">
                    <label class="col-sm-3 control-label">初始密码</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" name="password" v-model="form.password">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">确认密码</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" name="confirmPassword" v-model="form.confirmPassword">
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">初始密码</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" required="" aria-required="true" name="password" v-model="form.password">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">确认密码</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" required="" aria-required="true" name="confirmPassword" v-model="form.confirmPassword">
                    </div>
                  </div>
                </template>

              </div>
            </form>
          </div>

          <div class="modal-footer">
            <b class="btn btn-white" data-dismiss="modal">关闭</b>
            <button type="submit" class="btn btn-primary" @click="submit()">提交</button>
          </div>
        </div>
      </div>
    </div>
    <!-- model end -->

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Order',
  data () {
    return {
      tableOptions: [
        { key: "status", title: "订单状态" },
        { key: "number", title: "商品数量" },
        { key: "total", title: "订单金额" },
        { key: "pay_type", title: "支付类型" },
        { key: "time", title: "下单时间" }
      ],
      items: [],
      total: 0,
      page: 1,
      pageSize: this.$Config.page_size,
      condition: {},
      form: {},
      validate: null,
      isSubmit: false
    }
  },
  methods: {
    getDataTables (page = 1) {
      this.items = []
      this.total = 0
      const condition = {
        page: page,
        per_number: this.pageSize
      }

      for (const key in this.condition) {
        if (this.condition[key] || this.condition[key] === 0) {
          condition[key] = this.condition[key]
        }
      }

      this.$Service.Order.get(condition).then(response => {
        if (response.code == 200) {
          this.items = response.data
          this.total = response.total
          this.$nextTick(() => this.$H5UI.iCheck())
        } else {
          toastr.error(response.msg)
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
      if (form.phone.length != 11) {
        toastr.info('请输入11位数的电话号码!')
        return false
      }
      if (form.password != form.confirmPassword) {
        toastr.info('输入的密码不一致!')
        return false
      }
      return true
    },
    submit () {
      if (this.isSubmit) return;  // 防止多次提交
      if (!$('#form').valid()) return;  // 必填验证
      if (!this.checkForm(this.form)) return;  // 表单验证
      this.isSubmit = true

      console.log(this.form)
      const request = {
        email: this.form.email,
        name: this.form.name,
        password: this.form.password,
        phone: this.form.phone,
        username: this.form.username
      }

      if (this.form.id) { // 修改
        const id = this.form.id
        this.$Service.Order.edit(id, request).then(response => {
          this.isSubmit = false
          if (response.code == 200) {
            toastr.success('新增成功')
            this.getDataTables(this.page)
          } else {
            toastr.error(response.msg)
          }
        })
      } else {  // 新增
        this.$Service.Order.add(request).then(response => {
          this.isSubmit = false
          if (response.code == 200) {
            toastr.success('修改成功')
            this.getDataTables()
          } else {
            toastr.error(response.msg)
          }
        })
      }

    },
    edit (item) {
      this.clear()
      this.form = {
        id: item.id,
        email: item.email,
        name: item.name,
        phone: item.phone.toString(),
        username: item.username
      }
    },
    del (item) {
      this.$Service.Order.del(item.id).then(response => {
        if (response.code == 200) {
          toastr.success('删除成功')
          this.getDataTables()
        } else {
          toastr.error(response.msg)
        }
      })
    }
  },
  created () {
    this.getDataTables()
//  {"id": 1, "name": "zhangsan"}
  },
  mounted () {
    this.validate = this.$H5UI.validate('#form')  //  添加表单验证
  }
}
</script>

<style scoped>
</style>
