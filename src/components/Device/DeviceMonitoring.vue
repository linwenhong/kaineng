<template>
  <div class="wrapper wrapper-content">

    <page-header-button @add="add"></page-header-button>

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>设备状态监测</h5>
      </div>

      <div class="ibox-content">
        <div class="search-page">
          <div class="form-group">
            <label class="control-label">告警日期</label>
            <button type="button" class="btn" :class="dateOption == 1 ? 'btn-info' : 'btn-default'"
                    @click="selectDateOption(1)">今天</button>
            <button type="button" class="btn" :class="dateOption == 3 ? 'btn-info' : 'btn-default'"
                    @click="selectDateOption(3)">3天内</button>
            <button type="button" class="btn" :class="dateOption == 7 ? 'btn-info' : 'btn-default'"
                    @click="selectDateOption(7)">7天内</button>

            <date-time text="自定义时间"></date-time>
          </div>
          <div class="form-group">
            <label class="control-label">商户名称</label>
            <input type="text" class="form-control" v-model.trim="condition['merchant']">

            <label class="control-label">设备sn</label>
            <input type="text" class="form-control" v-model.trim="condition['sn']">

            <label class="control-label">告警源类型</label>
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
            </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) of items" :key="item.id">
            <td v-for="option of tableOptions">
              <template v-if="option.key == 'manufacturer'">{{ item['manufacturer'].name }}</template>
              <template v-else-if="option.key == 'merchant'">{{ item['merchant'].name }}</template>
              <template v-else>{{ item[option.key] }}</template>
            </td>
          </tr>
          </tbody>
        </table>
        <vue-pagination :current-page="page" :total="total" :page-size="pageSize" @current-change="pageChange" theme="gray"></vue-pagination>

      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'DeviceMonitoring',
  data () {
    return {
      tableOptions: [
        { key: "id", title: "ID" },
        { key: "sn", title: "设备sn" },
        { key: "name", title: "设备名称" },
        { key: "master_slave", title: "设备主从编号" },
        { key: "merchant", title: "所属商户" },
        { key: "error_source", title: "告警源" },
        { key: "error_code", title: "告警编码" },
        { key: "error_content", title: "告警内容" },
        { key: "error_time", title: "告警时间" },
        { key: "staff", title: "维护人员" },
        { key: "phone", title: "联系电话" }
      ],
      items: [],
      total: 0,
      page: 1,
      pageSize: this.$Config.page_size,
      dateOption: 0,
      condition: {},
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

      if (this.dateOption > 0) {
        condition['start_time'] = this.$Method.formatDate(new Date().getTime() - (1000*60*60*24*(this.dateOption - 1)), 'yyyy-MM-dd')
        condition['end_time'] = this.$Method.formatDate(new Date().getTime() + 1000*60*60*24, 'yyyy-MM-dd')
      } else {
        if ($('#startTime').val() && $('#endTime').val()) {
          condition['start_time'] = $('#startTime').val()
          condition['end_time'] = $('#endTime').val()
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
    selectDateOption (value) {
      this.dateOption = this.dateOption == value ? 0 : value
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
