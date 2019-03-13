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
            <label class="control-label">设备sn</label>
            <input type="text" class="form-control" v-model.trim="condition['sn']">

            <label class="control-label">设备状态</label>
            <select class="form-control" v-model="condition['status']">
              <option value="">全部</option>
              <option value="1">正常</option>
              <option value="2">待检测</option>
              <option value="3">损坏</option>
            </select>

            <button type="button" class="btn btn-primary search" @click="getDataTables()">查询</button>
          </div>
        </div>

        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th></th>
              <th v-for="option of tableOptions">{{ option.title }}</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) of items" :key="item.id">
            <td>
              <div class="checkbox i-checks">
                <label>
                  <input name="select" type="checkbox" :value="index"><i></i></label>
              </div>
            </td>
            <td v-for="option of tableOptions">
              <template v-if="option.key == 'manufacturer'">{{ item['manufacturer'].name }}</template>
              <template v-else-if="option.key == 'merchant'">{{ item['merchant'].name }}</template>
              <template v-else>{{ item[option.key] }}</template>
            </td>
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
            <h4 class="modal-title">{{ form.id ? '修改设备信息' : '新增设备' }}</h4>
          </div>

          <form id="form" class="form-horizontal" @submit.prevent="submit">
            <div class="modal-body">
              <div class="row">

                  <div class="form-group">
                    <label class="col-sm-3 control-label">设备sn</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="sn" v-model.trim="form.sn">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">所属制造商</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="manufacturer" v-model.trim="form.manufacturer">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">设备状态</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="display" v-model.trim="form.display">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">所属商户</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="merchant" v-model.trim="form.merchant">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">设备运行状态</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="status" v-model.trim="form.status">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">布防地点</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="position" v-model.trim="form.position">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">维护人员</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="staff" v-model.trim="form.staff">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">联系电话</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="phone" v-model="form.phone"
                             maxlength="11" oninput="this.value=this.value.replace(/[^\d.]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d.]/g,'')" >
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">最后检测时间</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="last_check_time" v-model.trim="form.last_check_time">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">关联商户时间</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="relation_time" v-model.trim="form.relation_time">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-sm-3 control-label">导入时间</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" required="" aria-required="true" name="import_time" v-model.trim="form.import_time">
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
  name: 'Device',
  data () {
    return {
      tableOptions: [
        { key: "id", title: "ID" },
        { key: "sn", title: "设备sn" },
        { key: "manufacturer", title: "所属制造商" },
        { key: "display", title: "设备状态" },
        { key: "merchant", title: "所属商户" },
        { key: "status", title: "设备运行状态" },
        { key: "position", title: "布防地点" },
        { key: "staff", title: "维护人员" },
        { key: "phone", title: "联系电话" },
        { key: "last_check_time", title: "最后检测时间" },
        { key: "relation_time", title: "关联商户时间" },
        { key: "import_time", title: "导入时间" }
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

      this.$Service.Device.get(condition).then(response => {
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
      return true
    },
    submit () {
      if (this.isSubmit) return;  // 防止多次提交
      if (!$('#form').valid()) return;  // 必填验证
      if (!this.checkForm(this.form)) return;  // 表单验证
      this.isSubmit = true

      console.log(this.form)
      const request = {
        sn: this.form.sn,
        manufacturer: this.form.manufacturer,
        display: this.form.display,
        merchant: this.form.merchant,
        status: this.form.status,
        position: this.form.position,
        staff: this.form.staff,
        phone: this.form.phone,
        last_check_time: this.form.last_check_time,
        relation_time: this.form.relation_time,
        import_time: this.form.import_time
      }

      if (this.form.id) { // 修改
        const id = this.form.id
        this.$Service.Device.edit(id, request).then(response => {
          this.isSubmit = false
          if (response.code == 200) {
            toastr.success('新增成功')
            this.getDataTables(this.page)
          } else {
            toastr.error(response.msg)
          }
        })
      } else {  // 新增
        this.$Service.Device.add(request).then(response => {
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
        sn: item.sn,
        manufacturer: item.manufacturer.id,
        display: item.display,
        merchant: item.merchant.id,
        status: item.status,
        position: item.position,
        staff: item.staff,
        phone: item.phone.toString(),
        last_check_time: item.last_check_time,
        relation_time: item.relation_time,
        import_time: item.import_time
      }
    },
    del (item) {
      this.$Service.Device.del(item.id).then(response => {
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
