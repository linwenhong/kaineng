<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>订单管理</h5>
      </div>

      <div class="ibox-content">
        <div class="search-page">

          <div class="form-group">
            <!--<label class="control-label">商户名</label>-->
            <!--<input type="text" class="form-control" v-model.trim="condition['merchant_name']">-->

            <!--<date-time text="下单时间"></date-time>-->

            <!--<label class="control-label">支付类型</label>-->
            <!--<select class="form-control" v-model="condition['pay_type']">-->
              <!--<option value="">全部</option>-->
              <!--<option value="9">微信</option>-->
              <!--<option value="10">支付宝</option>-->
            <!--</select>-->

            <label class="control-label">结算状态</label>
            <select class="form-control" v-model="condition['has_settled']">
              <option value="">全部</option>
              <option value="1">未结算</option>
              <option value="2">已结算</option>
            </select>

            <label class="control-label">订单号</label>
            <input type="text" class="form-control" v-model.trim="condition['out_trade_no']">

            <label class="control-label">设备sn</label>
            <input type="text" class="form-control" v-model.trim="condition['device_id']">

            <button type="button" class="btn btn-primary search" @click="getDataTables()">查询</button>
          </div>
        </div>

        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th v-for="option of tableOptions">{{ option.title }}</th>

              <template v-if="pageType == 2">
                <th v-for="option of tableOptions2">{{ option.title }}</th>
              </template>

              <th>操作</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) of items" :key="item.id">
            <td>{{ item.out_trade_no }}</td>
            <!--<td>{{ item.trade_status | OrderStatus }}</td> 邹阳明注释，替换为下行-->
            <td>{{ item.status_name }}</td>
            <td>{{ item.device_id }}</td>
            <td>{{ item.product_sum }}</td>
            <td>{{ item.total_amount }}</td>
            <td>{{ item.reality_amount }}</td>
            <td>{{ item.pay_type | PayType }}</td>
            <td>{{ item.create_at }}</td>
            <td>{{ item.has_settled | OrderSettlementStatus }}</td>

            <template v-if="pageType === '2'">
              <td>{{ item.refund_amount }}</td>
            </template>

            <td>
              <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#Modal" @click="details(item)">详情</button>
              <!--<info-confirm @confirm="del" :data="item"></info-confirm>-->
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
                <th>序号</th>
                <th>商品名称</th>
                <th>数量</th>
                <th>单价</th>
                <th>出货状态</th>

                <template v-if="pageType === '2' ">
<!--                  <th>退款状态</th>邹阳明注释 -->
                  <th>操作</th>
                </template>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) of orderGoodList" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.product_name }}</td>
                <td>1</td>
                <td>¥{{ item.price.toFixed(2) }}</td>
<!--                <td>{{ item.is_out | OrderGoodOutStatus }}</td>-->
                <td>{{ item.status_name }}</td>
                <template v-if="pageType === '2'">
<!--                  <td>{{ order.refund_status }}</td> 邹阳明注释-->
                  <td>
                    <template v-if= "item.detail_status===3">
                      <info-confirm @confirm="refund" :data="item"  title="确定要进行退款吗" text="退款"></info-confirm>
                    </template>
                    <template v-else>
                      <info-confirm @confirm="refund" :data="item" disabled="true" title="确定要进行退款吗" text="退款"></info-confirm>
                    </template>
                  </td>
                </template>
              </tr>
              <tr v-if="pageType === '1'">
                <td colspan="4"></td>
                <td>合计：¥{{ order.total_amount }}</td>
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
      user: this.$store.getters.getUser,
      pageType: 1, // 1: 订单查询, 2: 异常订单
      tableOptions: [
        { key: "out_trade_no", title: "订单号" },
        { key: "trade_status", title: "订单状态" },
        { key: "device_id", title: "设备sn" },
        { key: "product_sum", title: "商品数量" },
        { key: "total_amount", title: "订单总金额" },
        { key: "reality_amount", title: "实际收款金额" },
        { key: "pay_type", title: "支付类型" },
        { key: "create_at", title: "下单时间" },
        { key: "has_settled", title: "结算状态" }
      ],
      tableOptions2: [
//        { key: "refund_number", title: "退款商品数量" },
        { key: "refund_amount", title: "退款金额" },
//        { key: "refund_status", title: "退款状态" },
//        { key: "refund_time", title: "退款时间" }
      ],
      orderGoodList: [],
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
//      const startTime = $('#startTime').val()
//      const endTime = $('#endTime').val()
//      if (!startTime && endTime) {
//        toastr.info('请选择开始时间!')
//        return
//      }
//      if (startTime && !endTime) {
//        toastr.info('请选择结束时间!')
//        return
//      }

      const condition = {
        mch_id: this.user.mch_id,
        page_no: page,
        page_size: this.pageSize
      };

      if (this.pageType === '2') {
        condition.trade_status = 3
      }
      for (const key in this.condition) {
        if (this.condition[key]) {
          condition[key] = this.condition[key]
        }
      }

//      if (startTime && endTime) {
//        condition['start_time'] = startTime
//        condition['end_time'] = endTime
//      }

      this.$Service.Order.get(condition).then(response => {
        if (response.err_code) {
          this.toastr.error(response.err_msg, response.err_code)
        } else {
          this.items = response.list;
          this.total = response.total;
        }
      })
    },
    pageChange (page) {
      this.getDataTables(page)
    },
    details (item) {
      this.order = item;
      this.$Service.Order.details({
        page_no: 1,
        page_size: 10000,
        mch_id: this.user.mch_id,
        out_trade_no: item.out_trade_no
      }).then(response => {
        if (response.err_code) {
          this.toastr.error(response.err_msg, response.err_code)
        } else {
          this.orderGoodList = response.list
        }
      })
    },
    del (item) {
      this.$Service.Order.del(item.id).then(response => {
        if (response.code === 200) {
          this.toastr.success('删除成功');
          this.getDataTables()
        } else {
          this.toastr.error(response.msg)
        }
      })
    },
    refund (item) {
      console.log(item)
    },
    pageInit () {
      this.pageType = this.$route.query['pageType'];
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
