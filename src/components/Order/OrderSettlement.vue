<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>待结算订单</h5>
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
            <button type="button" class="btn btn-warning search" @click="settlement()">结算</button>
          </div>
        </div>

        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>订单号</th>
              <th>商户名</th>
              <th v-for="option of tableOptions">{{ option.title }}</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) of items" :key="item.id">
            <td>
              <div class="checkbox i-checks">
                <label>
                  <input name="select" type="checkbox" :value="item.id"><i></i></label>
              </div>
            </td>
            <td>{{ item.id }}</td>
            <td>{{ item.coding }}</td>
            <td>{{ item.merchant.name }}</td>
            <td v-for="option of tableOptions">{{ item[option.key] }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-warning" data-toggle="modal" data-target="#Modal" @click="details(item)">结算</button>
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
            <h4 class="modal-title">订单详情</h4>
          </div>
          <div class="modal-body">
            <table class="table table-bordered text-center">
              <tbody>
                <tr>
                  <td><b>商户名</b></td><td>{{ settlementOrderDetails.name }}</td>
                  <td><b>商户账号</b></td><td>{{ settlementOrderDetails.name }}</td>
                </tr>
                <tr>
                  <td><b>结算开始时间</b></td><td>{{ settlementOrderDetails.start_time }}</td>
                  <td><b>结算结束时间</b></td><td>{{ settlementOrderDetails.end_time }}</td>
                </tr>
                <tr>
                  <td><b>结算订单数</b></td><td>{{ settlementOrderDetails.number }}</td>
                  <td><b>订单总金额</b></td><td>{{ settlementOrderDetails.test }}</td>
                </tr>
                <tr>
                  <td><b>结算方式</b></td><td>{{ settlementOrderDetails.test }}</td>
                  <td><b>订单金额</b></td><td>{{ settlementOrderDetails.test }}</td>
                </tr>
                <tr>
                  <td><b>结算账号</b></td><td>{{ settlementOrderDetails.name }}</td>
                  <td><b>结算户名</b></td><td>{{ settlementOrderDetails.name }}</td>
                </tr>
                <tr>
                  <td><b>操作人</b></td><td>{{ settlementOrderDetails.name }}</td>
                  <td></td><td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="modal-footer">
            <b class="btn btn-white" data-dismiss="modal">关闭</b>
          </div>
        </div>
      </div>
    </div>
    <!-- model end -->

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'OrderSettlement',
  data () {
    return {
      tableOptions: [
        { key: "total", title: "订单金额" },
//        { key: "pay_type", title: "支付类型" },
        { key: "status", title: "订单状态" },
        { key: "enable_status", title: "是否冻结" },
        { key: "settlement_status", title: "结算状态" },
        { key: "settlement_total", title: "结算金额" },
        { key: "time", title: "下单时间" },
        { key: "settlement_time", title: "结算时间" }
      ],
      items: [],
      total: 0,
      page: 1,
      pageSize: this.$Config.page_size,
      condition: {},
      lastCondition: {},
      merchantList: [{id: 1,name: '张三'}, {id: 2,name: '李四'}],
      settlementOrderDetails: {},
      isSubmit: false
    }
  },
  watch: {
    $route (to, from) {
      this.pageInit()
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
          this.lastCondition[key] = this.condition[key]
        } else {
          delete this.lastCondition[key]
        }
      }

      if (startTime && endTime) {
        condition['start_time'] = startTime
        condition['end_time'] = endTime
        this.lastCondition['start_time'] = startTime
        this.lastCondition['end_time'] = endTime
      } else {
        delete this.lastCondition['start_time']
        delete this.lastCondition['end_time']
      }

      if (name) {
        condition['name'] = name
        this.lastCondition['name'] = name
      } else {
        delete this.lastCondition['name']
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
    details (item) {
      this.order = item
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
    },
    settlement (item) {
      if (JSON.stringify(this.lastCondition) == "{}") {
        toastr.info('请查询后结算!')
        return
      }
      const select = this.$H5UI.getChecked('select')
      this.settlementOrderDetails = {
        ids: select,
        number: select.length,
        name: this.lastCondition.name,
        start_time: this.lastCondition.start_time,
        end_time: this.lastCondition.end_time,
      }
      console.log(this.lastCondition)
      console.log(this.settlementOrderDetails)
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
