<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>商品上架</h5>
      </div>

      <div class="device-list">
        <!--<div class="search-page device-search">-->
          <!--<input type="text" class="form-control" v-model.trim="deviceName">-->
          <!--<button type="button" class="btn btn-primary search" @click="getDataTables()">查询</button>-->
        <!--</div>-->
        <ul>
          <li v-for="(device, index) of MerchantDevice" @click="selectMerchantDevice(device, index)">
            <p>{{ index + 1 }}.{{ device.device_name }}</p>
            <p>地址: {{ device.deploy_branch_id }}</p>
            <p>联系人: {{ device.mch_name }} {{ device.mch_id }}</p>
          </li>
        </ul>
      </div>

      <div class="ibox-content">
        <div class="form-group" v-if="SubDevices.length > 0">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Modal2" @click="replenish()">货道补货</button>
          <button type="button" class="btn btn-info" @click="replenishOrderHistory()">补货记录</button>
        </div>
        <div class="form-group device">
          柜号:
          <template v-for="(details, index) of SubDevices">
            <button type="button" class="btn btn-sm" :class="selectOption == index ? 'btn-info' : 'btn-default'"
                    @click="selectDeviceOption(index)">{{ details.name }}</button>
          </template>
        </div>

        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th>货架层</th>
              <th colspan="3">货物通道信息</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(shelf_layer, index) of DeviceGood">
              <!--<td>{{ DeviceGood.length - index }}</td>-->
              <td>{{ shelf_layer.name }}</td>
              <td v-for="passageway of shelf_layer.passageways">
                <template v-if="passageway.merge_status == 2">
                  被合并
                </template>
                <template v-else>
                  <div class="good" @click="edit(passageway)">
                    <div class="good-icon-box">
                      <img class="good-icon" :src="$Config.img_url + passageway.img_path">
                    </div>
                    <div class="good-icon-box">
                      <p><small>售价: ¥ {{ passageway.product_price }}</small></p>
                      <p><small>库存: {{ passageway.product_sum }}</small></p>
                    </div>
                    <p class="text">
                      {{ passageway.product_name }}
                      <small v-if="passageway.spec">({{ passageway.spec }})</small>
                    </p>
                    <span class="left">状态:
                      <span :class="passageway.used == 2 ? 'green' : 'red'">{{ passageway.used | PassagewayUsed }}</span>
                    </span>
                    <span class="right"><small>货道号: {{ passageway.channel_no }}</small></span>
                  </div>
                </template>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

    <!-- model -->
    <div class="modal inmodal fade" id="Modal" tabindex="-1" role="dialog"  aria-hidden="true">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">选择上架商品</h4>
          </div>

          <div class="modal-body">
            <p class="passageway-number">当前货道号:
              <font color="red">{{ passageway.channel_no }}</font>
              <button type="button" class="btn btn-sm btn-danger" @click="enable(passageway)">{{ passageway.used == 2 ? '关闭' : '启用' }}</button>
            </p>
            <form id="form" class="form-horizontal" @submit.prevent="getGoodTables">
              <div class="search-page">
                <div class="form-group">
                  <input type="text" class="form-control search-name" placeholder="输入商品名称，回车查询" v-model.trim="goodName">

                  <!--<div class="checkbox i-checks">-->
                    <!--<label>-->
                      <!--<input name="select" type="checkbox" value="1"><i></i>包含系统商品(不选只查询自添加商品)</label>-->
                  <!--</div>-->
                </div>
              </div>
              <button type="submit" class="btn btn-primary" style="display: none">提交</button>
            </form>
            <table class="table table-bordered text-center">
              <thead>
              <tr>
                <th>ID</th>
                <th>商品名称</th>
                <th>规格</th>
                <th>商品分类</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(good, index) of goods" :key="good.id" @click="selectGood(good)" :class="selectGoodId == good.id ? 'hover' : ''">
                <td>{{ good.id }}</td>
                <td>{{ good.product_name }}</td>
                <td>{{ good.spec }}</td>
                <td>{{ good.category_name }}</td>
              </tr>
              </tbody>
            </table>

            <div class="form-group" v-if="selectGoodId > 0">
              <p>请选择商品价格</p>
              <div class="radio i-checks" v-for="(option, optionIndex) of goodPrices">
                <label>
                  <input type="radio" :value="optionIndex" name="price"/>¥ {{ option.selling_price }}
                </label>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <b class="btn btn-white" data-dismiss="modal">关闭</b>
            <b class="btn btn-primary" @click="submit">提交</b>
            <!--<button type="submit" class="btn btn-primary">提交</button>-->
          </div>

        </div>
      </div>
    </div>
    <!-- model end -->

    <!-- model -->
    <div class="modal inmodal fade" id="Modal2" tabindex="-1" role="dialog"  aria-hidden="true">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">补货</h4>
          </div>

          <form id="form2" class="form-horizontal" @submit.prevent="replenishConfirm">
            <div class="modal-body">
              <table class="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>货道号</th>
                    <th>商品</th>
                    <th>规格</th>
                    <th>库存</th>
                    <th>补货数量</th>
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
  name: 'GoodUpperShelf',
  data () {
    return {
      user: this.$store.getters.getUser,
      goods: [],
      selectOption: 0, // 选择的子设备(柜体)下标
      selectGoodId: 0, // 选中定价的商品id, 用于获取当前商品所有定价
      selectDevice: {}, // 选中设备
      valuationGood: {}, // 选中定价的商品
      goodPrices: [], // 商品所有定价
      passageway: {},  // 当前货物通道
      condition: {},
      deviceName: '',
      goodName: '',
      lastSelectDeviceIndex: 0,
      DevicePassageways: [],  // 选择设备的通道列表
      Passageways: [],  // 补货列表
      MerchantDevice: [], // 商户设备列表
      SubDevices: [], // 选中的设备 子设备(柜体)列表
      DeviceGood: [], // 选中的子设备(柜体) 货物层列表
      validate: null,
      isSubmit: false
    }
  },
  methods: {
    getDataTables () {
      this.SubDevices = []
      this.DeviceGood = []
      const request= {
        mch_id: this.user.mch_id,
        page_no: 1,
        page_size: 10000
      }
      if (this.deviceName) {
        request.name = this.deviceName
      }
      this.$Service.Device.get(request).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          this.MerchantDevice = response.list
          this.total = response.total
          if (this.MerchantDevice.length > 0) {
            this.selectMerchantDevice(this.MerchantDevice[this.lastSelectDeviceIndex], this.lastSelectDeviceIndex)
          }
        }
      })
    },
    selectMerchantDevice (device, index) {
      this.selectDevice = device
      this.lastSelectDeviceIndex = index
      console.log('device', device)
      this.$Service.GoodUpperShelf.get({
        mch_id: device.mch_id,
        device_id: device.sn,
        page_no: 1,
        page_size: 10000
      }).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          this.SubDevices = []
          this.DevicePassageways = response.list
          response.list.map(passageway => {
            if (passageway.channel_no > 999 && passageway.channel_no < 10000) {
              const passagewayChannelNo = passageway.channel_no.toString()
              const d = Number(passagewayChannelNo.slice(0, 1))
              const f = Number(passagewayChannelNo.slice(1, 2))
              if (!this.SubDevices[d-1] || !this.SubDevices[d-1].name) {
                switch (d) {
                  case 1:
                    this.SubDevices[0] = {}
                    this.SubDevices[0].name = '主柜'
                    this.SubDevices[0].shelf_layer = []
                    break
                  case 2:
                    this.SubDevices[1] = {}
                    this.SubDevices[1].name = '左柜'
                    this.SubDevices[1].shelf_layer = []
                    break
                  case 3:
                    this.SubDevices[2] = {}
                    this.SubDevices[2].name = '右柜'
                    this.SubDevices[2].shelf_layer = []
                    break
                  default:
                    console.log('编号首位非1-3')
                }
              }
              if (!this.SubDevices[d-1].shelf_layer[f] || !this.SubDevices[d-1].shelf_layer[f].name) {
                this.SubDevices[d-1].shelf_layer[f] = {
                  name: `第${f+1}层`,
                  passageways: []
                }
              }
              this.SubDevices[d-1].shelf_layer[f].passageways.push(passageway)
            } else  {
              console.log("channel_no非4位数字")
            }
          })
          this.selectDeviceOption(0)
        }
      })
    },
    selectDeviceOption (index) {
      this.selectOption = index
      this.DeviceGood = this.SubDevices[index].shelf_layer
      console.log('sub_device', this.SubDevices[index])
    },
    edit (passageway) {
      this.selectGoodId = 0
      console.log('passageway', passageway)
      this.passageway = passageway
      $('#Modal').modal('show')
    },
    enable (passageway) {
      console.log('passageway', passageway)
      this.$Service.GoodUpperShelf.enable({
        id: passageway.id,
        device_id: passageway.device_id,
        used: passageway.used == 2 ? 1 : 2
      }).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          toastr.success((passageway.used == 2 ? '关闭' : '启用') + '成功')
          $('#Modal').modal('hide')
          this.getDataTables()
        }
      })
    },
    getGoodTables () {
      const request = {
        page_no: 1,
        page_size: 10000,
        mch_id: this.user.mch_id,
        category_id: 0
      }
      if (this.goodName) {
        request.name = this.goodName
      }
//      if (this.$H5UI.getChecked('select')[0]) {
//        request.all = 1
//      }
      this.selectGoodId = 0
      this.$Service.Good.get(request).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          this.goods = response.list
        }
      })
    },
    selectGood (good) {
      if (this.selectGoodId == good.id) {
        return
      }
      this.valuationGood = good
      this.selectGoodId = good.id
      this.goodPrices = good.product_prices
      this.$nextTick(() => {
        this.$H5UI.iCheck()
        this.$H5UI.clearRadio()
        this.$H5UI.setRadioVal('price', 0)
      })
    },
    submit () {
      if (this.selectGoodId == 0) {
        toastr.info('请先选择商品')
        return
      }
      const priceIndex = Number(this.$H5UI.getRadioVal('price'))
      if (!priceIndex && priceIndex != 0) {
        toastr.info('请选择商品价格')
        return
      }
      const request = {
        mch_id: this.user.mch_id,
        id: this.passageway.id,
        category_id: this.valuationGood.category_id,
        category_name: this.valuationGood.category_name,
        product_id: this.valuationGood.id,
        product_name: this.valuationGood.product_name,
        price_id: this.goodPrices[priceIndex].id,
        product_price: this.goodPrices[priceIndex].selling_price
      }
      console.log(request)
      console.log(this.valuationGood)
      this.$Service.GoodUpperShelf.edit({
        list: [request]
      }).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          $('#Modal').modal('hide')
          this.getDataTables()
        }
      })
    },
    replenish () {  // 打开补货窗口
      this.Passageways = this.DevicePassageways.map(passageway => {
        return {
          channel_no: passageway.channel_no,
          product_name: passageway.product_name,
          spec: passageway.spec,
          price: passageway.product_price,
          residue: passageway.product_sum
        }
      })
      console.log(this.Passageways)
    },
    replenishConfirm () {  // 提交补货订单
      const list = []
      this.Passageways.map(passageway => {
        if (passageway.require_sum && passageway.require_sum > 0) {
          list.push(passageway)
        }
      })
      console.log(this.Passageways)
      this.$Service.ReplenishOrder.add({
        mch_id: this.user.mch_id,
        device_id: this.selectDevice.sn,
        list: list
      }).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          $('#Modal2').modal('hide')
          this.getDataTables()
        }
      })
    },
    replenishOrderHistory () {
      this.$router.push('/merchant/replenish-order?device_id=' + this.selectDevice.sn)
    }
  },
  created () {
    this.getDataTables()
  },
  mounted () {
    this.$H5UI.iCheck()
  }
}
</script>

<style scoped>
  .table {
    min-width: 100%;
  }
  .ibox {
    position: relative;
    padding-left: 220px;
  }
  .device-list {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    padding: 15px 5px 0;
    background-color: #fff;
    border-top: 4px solid #e7eaec;
  }
  .device-list li {
    cursor: pointer;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
  .device-search input {
    width: 120px;
  }

  .good {
    display: inline-block;
    width: 150px;
  }
  .good p {
    margin-bottom: 0;
  }
  .good p.text {
    display: inline-block;
    width: 100%;
    margin-bottom: 5px;
    text-align: left;
  }
  .good span.left {
    float: left;
  }
  .good span.right {
    float: right;
  }
  .good span.left .green {
    color: #1ab394;
  }
  .good span.left .red {
    color: red;
  }
  .good-icon-box {
    width: 60px;
    height: 60px;
    float: left;
  }
  .good-icon-box p {
    margin-top: 5px;
    text-align: left;
   }
  .good-icon {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-size: 100%;
    float: left;
  }

  tr.hover {
    background-color: #cfcfcf;
  }
  input.search-name {
    width: 200px;
  }
  .i-checks {
    display: inline-block;
  }
  .device button {
    margin-right: 10px;
  }
  p.passageway-number {
    margin-bottom: 0;
  }
</style>
