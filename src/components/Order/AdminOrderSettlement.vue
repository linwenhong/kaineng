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
            <input type="text" class="form-control" v-model.trim="condition['mch_name']">

            <label class="control-label">是否完成</label>
            <select class="form-control" v-model="condition['is_finish']">
              <option value="1">未完成</option>
              <option value="2">已完成</option>
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
                  <input name="select" type="checkbox" :value="item.id"><i></i></label>
              </div>
            </td>
            <td>{{ item.out_trade_no }}</td>
            <td>{{ item.mch_name }}</td>
            <td>{{ item.create_at }}</td>
            <!--<td>{{ item.trade_status | OrderStatus }}</td>-->
            <!--<td>{{ item.total_amount }}</td>-->
            <td>{{ item.status_name }}</td>
            <td>{{ item.settle_amount.toFixed(2) }}</td>
            <td>{{ item.is_finish == 2 ? '已完成' : '未完成' }}</td>
            <td>{{ item.finish_at }}</td>
            <td>
              <info-confirm @confirm="settlement" type="warning" :data="item" title="确定要结算此订单吗？" text="结算"></info-confirm>

              <!--<button type="button" class="btn btn-sm btn-primary" @click="details(item)">详情</button>-->
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
  name: 'AdminOrderSettlement',
  data () {
    return {
      user: this.$store.getters.getUser,
      tableOptions: [
        { key: "out_trade_no", title: "订单号" },
        { key: "mch_name", title: "商户名" },
        { key: "create_at", title: "下单时间" },
//        { key: "trade_status", title: "订单状态" },
//        { key: "total_amount", title: "订单总金额" },
        { key: "status_name", title: "审核状态" },
        { key: "settled_amount", title: "结算金额" },
        { key: "is_finish", title: "是否完成" },
        { key: "finish_at", title: "完成时间" }
      ],
      items: [],
      total: 0,
      page: 1,
      pageSize: this.$Config.page_size,
      condition: {
        is_finish: 1
      },
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

      const condition = {
        page_no: page,
        page_size: this.pageSize
      }

      for (const key in this.condition) {
        if (this.condition[key]) {
          condition[key] = this.condition[key]
        }
      }

      this.$Service.AdminSettlementOrder.get(condition).then(response => {
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
    details (item) {
      this.$Service.AdminSettlementOrder.details({
        page_no: 1,
        page_size: 10000,
        settlement_id: item.id
      }).then(response => {
        if (response.err_code == 0) {
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })
    },
    settlement (item) {
      const request = {
        id: item.id,
        login_name: this.user.login_name
      }
      this.$Service.AdminSettlementOrder.settlement(request).then(response => {
        if (response.err_code == 0) {
          toastr.success('结算成功')
          this.getDataTables()
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })
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
