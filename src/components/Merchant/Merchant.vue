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
            <input type="text" class="form-control" v-model.trim="condition['name']">

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
            <td>{{ item.admin_name }}</td>
            <td>{{ item.admin_phone }}</td>
            <td>{{ item.admin_phone }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.account_name }}</td>
            <td>{{ item.account_id }}</td>
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
                  <label class="col-sm-3 control-label">管理员名称</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" name="admin_name" v-model.trim="form.admin_name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">管理员电话</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" maxlength="11"
                           oninput="numberFormat(this)" name="admin_phone" v-model="form.admin_phone">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">商户名称</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" name="name" v-model.trim="form.name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">商户联系电话</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" maxlength="11"
                           oninput="numberFormat(this)" name="phone" v-model="form.phone">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">账户姓名</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" name="account_name" v-model.trim="form.account_name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">账户号</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" name="account_id" v-model.trim="form.account_id">
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
  name: 'Merchant',
  data () {
    return {
      tableOptions: [
        { key: "id", title: "ID" },
        { key: "admin_name", title: "管理员名称" },
        { key: "admin_phone", title: "管理员电话" },
        { key: "status", title: "商户状态" },
        { key: "name", title: "商户名称" },
        { key: "phone", title: "商户联系电话" },
        { key: "type", title: "账户类型" },
        { key: "account_name", title: "账户姓名" },
        { key: "account_id", title: "账户号" }
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
        if (this.condition[key]) {
          condition[key] = this.condition[key]
        }
      }

      this.$Service.Merchant.get(condition).then(response => {
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
      if (form.admin_phone.length != 11) {
        toastr.info('请输入11位数的电话号码!')
        return false
      }
      if (form.phone.length != 11) {
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

      const request = {
        admin_name: this.form.admin_name,
        admin_phone: this.form.admin_phone,
        name: this.form.name,
        phone: this.form.phone,
        account_name: this.form.account_name,
        account_id: this.form.account_id
      }
      console.log(request);this.isSubmit = false;return;

      if (this.form.id) { // 修改
        const id = this.form.id
        this.$Service.Merchant.edit(id, request).then(response => {
          this.isSubmit = false
          if (response.code == 200) {
            toastr.success('新增成功')
            this.getDataTables(this.page)
          } else {
            toastr.error(response.msg)
          }
        })
      } else {  // 新增
        this.$Service.Merchant.add(request).then(response => {
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
        admin_name: item.admin_name,
        admin_phone: item.admin_phone.toString(),
        status: item.status,
        name: item.name,
        phone: item.phone.toString(),
        type: item.type,
        account_name: item.account_name,
        account_id: item.account_id
      }
    },
    del (item) {
      this.$Service.Merchant.del(item.id).then(response => {
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
  },
  mounted () {
    this.validate = this.$H5UI.validate('#form')  //  添加表单验证
  }
}
</script>

<style scoped>
</style>
