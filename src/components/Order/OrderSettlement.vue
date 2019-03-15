<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>订单管理</h5>
      </div>

      <div class="ibox-content">
        <div class="search-page">

          <div class="form-group">
            <label class="control-label">商户名</label>
            <input type="text" class="form-control" v-model.trim="condition['merchant_name']">

            <date-time text="下单时间"></date-time>

            <label class="control-label">支付类型</label>
            <select class="form-control" v-model="condition['pay_type']">
              <option value="">全部</option>
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
            <td v-for="option of tableOptions">{{ item[option.key] }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#Modal" @click="details(item)">编辑</button>
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
            <h4 class="modal-title">订单详情</h4>
          </div>
          <div class="modal-body">
            <table class="table table-bordered text-center">
              <thead>
              <tr>
                <th>商品编号</th>
                <th>商品名称</th>
                <th>数量</th>
                <th>单价</th>
                <th>小计金额</th>

                <template v-if="pageType == 2">
                  <th>退款状态</th>
                  <th>操作</th>
                </template>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) of order.goods" :key="item.id">
                <td>{{ item.good.coding }}</td>
                <td>{{ item.good.name }}</td>
                <td>{{ item.number }}</td>
                <td>¥{{ item.price.toFixed(2) }}</td>
                <td>¥{{ (item.number * item.price).toFixed(2) }}</td>

                <template v-if="pageType == 2">
                  <td>{{ order.refund_status }}</td>
                  <td>
                    <info-confirm @confirm="refund" :data="item" title="确定要进行退款吗" text="退款"></info-confirm>
                  </td>
                </template>
              </tr>
              <tr v-if="pageType == 1">
                <td colspan="4"></td>
                <td>合计：¥{{ order.total }}</td>
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
  name: 'Order',
  data () {
    return {
      pageType: 1, // 1: 订单查询, 2: 异常订单
      tableOptions: [
        { key: "total", title: "订单金额" },
        { key: "pay_type", title: "支付类型" },
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
      condition: {
        pay_type: ''
      },
      order: {},
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
    refund (item) {
      console.log(item)
    },
    pageInit () {
      this.pageType = this.$route.query['pageType'] || 1
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
