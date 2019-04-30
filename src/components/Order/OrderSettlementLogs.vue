<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>商户结算记录</h5>
      </div>

      <div class="ibox-content">
        <div class="search-page">

          <div class="form-group">
            <label class="control-label">商户名</label>
            <div class="searchOption">
              <search-select :data="merchantList"></search-select>
            </div>

            <date-time text="下单时间"></date-time>

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
            <td>{{ item.id }}</td>
            <td>{{ item.merchant.name }}</td>
            <td>{{ item.start_time }}</td>
            <td>{{ item.end_time }}</td>
            <td>{{ item.number }}</td>
            <td>{{ item.total }}</td>
            <td>{{ item.settlement_total }}</td>
            <td>{{ item.settlement_pay_type }}</td>
            <td>{{ item.merchant.account_id }}</td>
            <td>{{ item.merchant.account_name }}</td>
            <td>{{ item.author.name }}</td>
            <td>{{ item.settlement_time }}</td>
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
  name: 'OrderSettlementLogs',
  data () {
    return {
      tableOptions: [
        { key: "id", title: "ID" },
        { key: "merchant.name", title: "商户名" },
        { key: "start_time", title: "结算开始时间" },
        { key: "end_time", title: "结算结束时间" },
        { key: "number", title: "结算订单数" },
        { key: "total", title: "订单金额" },
        { key: "settlement_total", title: "结算金额" },
        { key: "settlement_pay_type", title: "结算方式" },
        { key: "merchant.account_id", title: "结算帐号" },
        { key: "merchant.account_name", title: "账号姓名" },
        { key: "author.name", title: "操作人" },
        { key: "settlement_time", title: "结算时间" }
      ],
      items: [],
      total: 0,
      page: 1,
      pageSize: this.$Config.page_size,
      condition: {},
      merchantList: [{id: 1,name: '张三'}, {id: 2,name: '李四'}],
      isSubmit: false
    }
  },
  methods: {
    getDataTables (page = 1) {
      const startTime = $('#startTime').val()
      const endTime = $('#endTime').val()
      const name = $('#searchSelect').attr('data-id')

      if (!startTime && endTime) {
        toastr.info('请选择开始时间!')
        return
      }
      if (startTime && !endTime) {
        toastr.info('请选择结束时间!')
        return
      }

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

      if (startTime && endTime) {
        condition['start_time'] = startTime
        condition['end_time'] = endTime
      }

      if (name) {
        condition['name'] = name
      }

      this.$Service.SettlementLogs.get(condition).then(response => {
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
    pageInit () {
      this.getDataTables()
    }
  },
  created () {
    this.pageInit()
  },
  mounted () {

  }
}
</script>

<style scoped>
</style>
