<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>商品上架</h5>
      </div>

      <div class="device-list">
        <div class="search-page device-search">
          <input type="text" class="form-control" v-model.trim="deviceName">
          <button type="button" class="btn btn-primary search" @click="getDataTables()">查询</button>
        </div>
        <ul>
          <li v-for="(device, index) of MerchantDevice" @click="selectMerchantDevice(device)">
            <p>{{ index + 1 }}.{{ device.name }}</p>
            <p>地址: {{ device.position }}</p>
            <p>联系人: {{ device.staff }} {{ device.phone }}</p>
          </li>
        </ul>
      </div>

      <div class="ibox-content">
        <div class="form-group device">
          <template v-for="(details, index) of SubDevices">
            <button type="button" class="btn" :class="selectOption == index ? 'btn-info' : 'btn-default'"
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
              <td>{{ DeviceGood.length - index }}</td>
              <!--<td>{{ shelf_layer.name }}</td>-->
              <td v-for="passageway of shelf_layer.passageways">
                <template v-if="passageway.status == 3">
                  被合并
                </template>
                <template v-else>
                  <div class="good" @click="edit(passageway)">
                    <div class="good-icon-box">
                      <img class="good-icon" :src="passageway.good.img_url">
                    </div>
                    <div class="good-icon-box">
                      <p>¥ {{ passageway.price }}</p>
                      <p><small>库存: {{ passageway.number }}</small></p>
                    </div>
                    <p class="text">{{ passageway.good.name }}</p>
                    <p class="text">
                      {{ passageway.good.specification }}
                      <span><small>货道号: {{ passageway.id }}</small></span>
                    </p>
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
            <p class="passageway-number">当前货道号: <font color="red">{{ passageway.id }}</font></p>
            <form id="form" class="form-horizontal" @submit.prevent="getGoodTables">
              <div class="search-page">
                <div class="form-group">
                  <input type="text" class="form-control search-name" placeholder="输入商品名称，回车查询" v-model.trim="goodName">

                  <div class="checkbox i-checks">
                    <label>
                      <input name="select" type="checkbox" value="1"><i></i>包含系统商品(不选只查询自添加商品)</label>
                  </div>
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
                <th>商品来源</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(good, index) of goods" :key="good.id" @click="selectGood(good)" :class="selectGoodId == good.id ? 'hover' : ''">
                <td>{{ good.id }}</td>
                <td>{{ good.name }}</td>
                <td>{{ good.specification }}</td>
                <td>系统</td>
              </tr>
              </tbody>
            </table>

            <div class="form-group" v-if="selectGoodId > 0">
              <p>请选择商品价格</p>
              <div class="radio i-checks" v-for="option of goodPrices">
                <label>
                  <input type="radio" :value="option.price" name="price"/>¥ {{ option.price }}
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
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'GoodUpperShelf',
  data () {
    return {
      goods: [],
      selectOption: 0, // 选择的子设备(柜体)下标
      selectGoodId: 0, // 选中定价的商品id, 用于获取当前商品所有定价
      goodPrices: [], // 商品所有定价
      passageway: {},  // 当前货物通道
      condition: {},
      deviceName: '',
      goodName: '',
      MerchantDevice: [], // 商户设备列表
      SubDevices: {}, // 选中的设备 子设备(柜体)列表
      DeviceGood: [], // 选中的子设备(柜体) 货物层列表
      validate: null,
      isSubmit: false
    }
  },
  methods: {
    getDataTables () {
      const request= {}
      if (this.deviceName) {
        request.name = this.deviceName
      }
      this.$Service.Device.get(request).then(response => {
        if (response.code == 200) {
          this.MerchantDevice = response.data
        }
      })
    },
    selectMerchantDevice (device) {
      console.log('device', device)
      this.$Service.GoodUpperShelf.get().then(response => {
        this.SubDevices = response.data.sub_device
        this.selectDeviceOption(0)
      })
    },
    selectDeviceOption (index) {
      this.selectOption = index
      this.DeviceGood = this.SubDevices[index].shelf_layer
      console.log('sub_device', this.SubDevices[index])
    },
    edit (passageway) {
      console.log('passageway', passageway)
      this.passageway = passageway
      this.getGoodTables()
      $('#Modal').modal('show')
    },
    getGoodTables () {
      const request = {}
      if (this.goodName) {
        request.name = this.goodName
      }
      if (this.$H5UI.getChecked('select')[0]) {
        request.all = 1
      }
      this.selectGoodId = 0
      this.$Service.Good.get(request).then(response => {
        this.goods = response.data
      })
    },
    selectGood (good) {
      this.$Service.GoodPrice.get().then(response => {
        if (response.code == 200) {
          this.goodPrices = response.data
          this.$nextTick(() => {
            this.$H5UI.iCheck()
            this.$H5UI.clearRadio()
            this.$H5UI.setRadioVal('price', this.goodPrices[0].price)
          })
        }
      })
      this.selectGoodId = good.id
    },
    submit () {
      if (this.selectGoodId == 0) {
        toastr.info('请先选择商品')
        return
      }
      const price = this.$H5UI.getRadioVal('price')
      if (!price) {
        toastr.info('请选择商品价格')
        return
      }
      const request = {
        passageway_id: this.passageway.id,
        good_id: this.selectGoodId,
        price: price
      }
      console.log(request)
    }
  },
  created () {

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
    width: 120px;
  }
  .good p {
    margin-bottom: 0;
  }
  .good p.text {
    text-align: left;
  }
  .good p.text span {
    float: right;
  }
  .good-icon-box {
    width: 60px;
    height: 60px;
    float: left;
  }
  .good-icon-box p {
     margin-top: 5px;
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
