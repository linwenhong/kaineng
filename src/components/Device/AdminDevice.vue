<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>设备管理</h5>
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
              <th v-for="option of tableOptions">{{ option.title }}</th>
              <!--<th>操作</th>-->
            </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) of items" :key="item.sn">
            <td>{{ item.device_name }}</td>
            <td>{{ item.mch_name }}</td>
            <td>{{ item.is_normal == 1 ? '是' : '否' }}</td>
            <td>{{ item.sn }}</td>
            <td>{{ item.manufacturer_name }}</td>
            <td>{{ item.deploy_branch_id }}</td>
            <td>{{ item.bind_at }}</td>
            <td>{{ item.activate_at }}</td>
            <td>{{ item.is_activate == 2 ? '已激活' : '未激活' }}</td>
            <!--<td>-->
              <!--<button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#Modal" @click="edit(item)">编辑</button>-->
              <!--<info-confirm @confirm="del" :data="item"></info-confirm>-->
            <!--</td>-->
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
            <h4 class="modal-title">修改设备信息</h4>
          </div>

          <form id="form" class="form-horizontal" @submit.prevent="submit">
            <div class="modal-body">
              <div class="row">

                <div class="form-group">
                  <label class="col-sm-3 control-label">设备名称</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true"
                           name="device_name" v-model.trim="form.device_name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">货道数量</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" maxlength="4"
                           oninput="numberFormat(this)" name="channel_sum" v-model="form.channel_sum">
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
  name: 'AdminDevice',
  data () {
    return {
      user: this.$store.getters.getUser,
      tableOptions: [
        { key: "device_name", title: "设备名称" },
        { key: "mch_name", title: "所属商户" },
//        { key: "status", title: "设备状态" },
        { key: "is_normal", title: "是否正常" },
        { key: "sn", title: "设备sn" },
        { key: "manufacturer_name", title: "所属制造商" },
        { key: "deploy_branch_id", title: "布防地点" },
//        { key: "staff", title: "维护人员" },
//        { key: "phone", title: "联系电话" },
//        { key: "last_abnormal_time", title: "最后异常时间" },
//        { key: "last_check_time", title: "最后检测时间" },
        { key: "bind_at", title: "关联商户时间" },
        { key: "activate_at", title: "导入时间" },
        { key: "is_activate", title: "是否激活" }
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
      const condition = {
        page_no: page,
        page_size: this.pageSize
      }

      for (const key in this.condition) {
        if (this.condition[key]) {
          condition[key] = this.condition[key]
        }
      }

      this.$Service.MerchantDevice.get(condition).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          this.items = response.list
          this.total = response.total
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
      return true
    },
    submit () {
      if (this.isSubmit) return;  // 防止多次提交
      if (!$('#form').valid()) return;  // 必填验证
      if (!this.checkForm(this.form)) return;  // 表单验证
      this.isSubmit = true

      const request = {
        mch_id: this.form.mch_id,
        sn: this.form.sn,
        channel_sum: Number(this.form.channel_sum),
        device_name: this.form.device_name
      }

      this.$Service.Device.edit(request).then(response => {
        this.isSubmit = false
        if (response.err_code == 0) {
          toastr.success('修改成功')
          this.getDataTables(this.page)
          $('#Modal').modal('hide')
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })
    },
    edit (item) {
      this.clear()
      this.form = {
        mch_id: item.mch_id,
        sn: item.sn,
        channel_sum: item.channel_sum,
        device_name: item.device_name
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
