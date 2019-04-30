<template>
  <div class="wrapper wrapper-content">

    <page-header-button @add="add"></page-header-button>

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>设备补货订单管理</h5>
      </div>

      <div class="ibox-content">
        <div class="search-page">
          <div class="form-group">

            <label class="control-label">商品分类</label>
            <select class="form-control" v-model="condition['order_status']">
              <option value="4">全部</option>
              <option value="1">未完成</option>
              <option value="2">已完成</option>
              <option value="3">已取消</option>
            </select>

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
            <td>{{ item.trade_no }}</td>
            <td>{{ item.mch_name }}</td>
            <td>{{ item.device_id }}</td>
            <td>{{ item.device_name }}</td>
            <td>{{ item.order_status | ReplenishOrderStatus }}</td>
            <td>{{ item.order_type | ReplenishOrderType }}</td>
            <td>{{ item.create_at }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#Modal" @click="edit(item)">编辑</button>
              <!--未完成-->
              <template v-if="item.order_status == 1">
                <info-confirm @confirm="cancel"
                              :data="item"
                              text="取消"
                              title="确定要取消订单吗？"
                ></info-confirm>
              </template>
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
            <h4 class="modal-title">补货详情</h4>
          </div>

          <form id="form" class="form-horizontal" @submit.prevent="submit">
            <div class="modal-body">
              <table class="table table-bordered text-center">
                <thead>
                <tr>
                  <th>货道号</th>
                  <th>商品</th>
                  <th>规格</th>
                  <th>原库存</th>
                  <th>要求补货数量</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(passageway, index) of Passageways" :key="passageway.id">
                  <td>{{ passageway.channel_no }}</td>
                  <td>{{ passageway.product_name }}</td>
                  <td>{{ passageway.spec }}</td>
                  <td>{{ passageway.residue }}</td>
                  <td style="width: 100px">
                    <input type="text" class="form-control" maxlength="4"
                           oninput="numberFormat(this)" name="require_sum" v-model.number="passageway.require_sum">
                  </td>
                </tr>
                </tbody>
              </table>
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
  name: 'ReplenishOrder',
  data () {
    return {
      user: this.$store.getters.getUser,
      deviceId: this.$route.query['device_id'],
      tableOptions: [
        { key: "trade_no", title: "编号" },
        { key: "mch_name", title: "商户" },
        { key: "device_id", title: "设备sn" },
        { key: "device_name", title: "设备名" },
        { key: "order_status", title: "状态" },
        { key: "order_type", title: "下单方式" },
        { key: "create_at", title: "创建时间" }
      ],
      items: [],
      DevicePassageways: [],  // 选择设备的通道列表
      Passageways: [],  // 补货列表
      total: 0,
      page: 1,
      pageSize: this.$Config.page_size,
      condition: {
        order_status: 4
      },
      selectOrder: {},
      validate: null,
      isSubmit: false
    }
  },
  methods: {
    getDataTables (page = 1) {
      const condition = {
        mch_id: this.user.mch_id,
        device_id: this.deviceId,
        page_no: page,
        page_size: this.pageSize
      }

      for (const key in this.condition) {
        if (this.condition[key]) {
          condition[key] = this.condition[key]
        }
      }

      this.$Service.ReplenishOrder.get(condition).then(response => {
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
    clear () {
      this.$H5UI.reset(this.validate)
      this.form = {}
      this.isSubmit = false
      $('#file').val('')
      $('#img').attr('src', '')
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
        mch_id: this.selectOrder.mch_id,
        trade_no: this.selectOrder.trade_no,
        list: []
      }
      const addRequest = {
        mch_id: this.selectOrder.mch_id,
        trade_no: this.selectOrder.trade_no,
        list: []
      }

      this.Passageways.map(passageway => {
        const item = {
          channel_no: passageway.channel_no,
          product_name: passageway.product_name,
          spec: passageway.spec,
          price: passageway.price,
          residue: passageway.residue,
          require_sum: passageway.require_sum || 0
        }
        if (passageway.id) {
          item.id = passageway.id
          request.list.push(item)
        } else {
          if (passageway.require_sum > 0) {
            addRequest.list.push(item)
          }
        }
      })

      if (request.list.length > 0) {
        this.$Service.ReplenishOrder.edit(request).then(response => {
          this.isSubmit = false
          if (response.err_code == 0) {
            toastr.success('修改成功')
            this.getDataTables(this.page)
            $('#Modal').modal('hide')
          } else {
            toastr.error(response.err_msg, response.err_code)
          }
        })
      }

      if (addRequest.list.length > 0) {
        this.$Service.ReplenishOrder.detailsAdd(addRequest).then(response => {
          if (response.err_code == 0) {
          } else {
            toastr.error(response.err_msg, response.err_code)
          }
        })
      }

    },
    edit (item) {
      this.clear()
      this.selectOrder = item
      this.Passageways = []

      this.$Service.ReplenishOrder.details({
        mch_id: this.user.mch_id,
        trade_no: item.trade_no,
        page_no: 1,
        page_size: 10000
      }).then(response => {
        if (response.err_code == 0) {
          this.setPassageways(response.list || [])
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })
    },
    cancel (item) {
      this.$Service.ReplenishOrder.cancel({
        mch_id: this.user.mch_id,
        trade_no: item.trade_no
      }).then(response => {
        if (response.err_code == 0) {
          toastr.success('取消成功')
          this.getDataTables()
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })
    },
    getDevicePassageways () {
      this.$Service.GoodUpperShelf.get({
        mch_id: this.user.mch_id,
        device_id: this.deviceId,
        page_no: 1,
        page_size: 10000
      }).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          this.DevicePassageways = response.list
        }
      })
    },
    setPassageways (existingOptions) {
      this.Passageways = this.DevicePassageways.map(passageway => {
        let result = {
          channel_no: passageway.channel_no,
          product_name: passageway.product_name,
          spec: passageway.spec,
          price: passageway.product_price,
          residue: passageway.product_sum,
          require_sum: 0
        }
        for (const option of existingOptions) {
          if (option.channel_no == passageway.channel_no) {
            result.id = option.id
            result.require_sum = option.require_sum
            break
          }
        }
        return result
      })
    }
  },
  created () {
    this.getDevicePassageways()
    this.getDataTables()
  },
  mounted () {
    this.validate = this.$H5UI.validate('#form')  //  添加表单验证
  }
}
</script>

<style scoped>
</style>
