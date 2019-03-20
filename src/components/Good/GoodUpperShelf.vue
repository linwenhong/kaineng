<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>商品上架</h5>
      </div>

      <div class="device-list">
        <div class="search-page device-search">
          <input type="text" class="form-control" v-model.trim="condition['name']">
          <button type="button" class="btn btn-primary search" @click="getDataTables()">查询</button>
        </div>
        <ul>
          <li>
            <p>1.DX001售货机</p>
            <p>地址: 广州市天河区万菱汇A</p>
            <p>联系人: 张三 18565478954</p>
          </li>
          <li>
            <p>1.DX001售货机</p>
            <p>地址: 广州市天河区万菱汇A</p>
            <p>联系人: 张三 18565478954</p>
          </li>
          <li>
            <p>1.DX001售货机</p>
            <p>地址: 广州市天河区万菱汇A</p>
            <p>联系人: 张三 18565478954</p>
          </li>
          <li>
            <p>1.DX001售货机</p>
            <p>地址: 广州市天河区万菱汇A</p>
            <p>联系人: 张三 18565478954</p>
          </li>
          <li>
            <p>1.DX001售货机</p>
            <p>地址: 广州市天河区万菱汇A</p>
            <p>联系人: 张三 18565478954</p>
          </li>
          <li>
            <p>1.DX001售货机</p>
            <p>地址: 广州市天河区万菱汇A</p>
            <p>联系人: 张三 18565478954</p>
          </li>
        </ul>
      </div>

      <div class="ibox-content">
        <div class="form-group">
          <template v-for="(details, index) of SubDevices">
            <button type="button" class="btn" :class="selectOption == index ? 'btn-info' : 'btn-default'"
                    @click="selectDeviceOption(index)">{{ details.name }}</button>
          </template>
        </div>

        <table class="table table-bordered text-center">
          <tbody>
            <tr v-for="(shelf_layer, index) of DeviceGood">
              <td>{{ DeviceGood.length - index }}</td>
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
            <form id="form" class="form-horizontal" @submit.prevent="getGoodTables">
              <div class="search-page">
                <div class="form-group">
                  <input type="text" class="form-control search-name" placeholder="输入商品名称，回车查询" v-model.trim="condition['name']">

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
                <th>价格</th>
                <th>定价说明</th>
                <th>商品来源</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(good, index) of goods" :key="good.id" @click="selectGood(good)" :class="selectGoodId == good.id ? 'hover' : ''">
                <td>{{ good.id }}</td>
                <td>{{ good.name }}</td>
                <td>{{ good.specification }}</td>
                <td>¥ {{ good.reference_price }}</td>
                <td>{{ good.remark }}</td>
                <td>系统</td>
              </tr>
              </tbody>
            </table>

            <form id="form2" class="form-horizontal" @submit.prevent="submit">
              <div class="search-page">
                <div class="form-group">
                  <label class="control-label">重新定价: </label>
                  <input type="text" class="form-control" v-model.trim="form['price']">
                </div>
                <div class="form-group">
                  <label class="control-label">定价说明: </label>
                  <input type="text" class="form-control search-name" v-model.trim="form['remark']">
                </div>
                <p>注意：商品价格变化时，同一售货机同一商品的所有货道价格全部调整一致</p>
              </div>
              <button type="submit" class="btn btn-primary" style="display: none">提交</button>
            </form>


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
      selectGoodId: 0,
      condition: {},
      form: {},
      SubDevices: {},
      DeviceGood: {},
      selectOption: 0,
      validate: null,
      isSubmit: false
    }
  },
  methods: {
    getDataTables () {
      this.$Service.GoodUpperShelf.get().then(response => {
        this.SubDevices = response.data.sub_device
        this.DeviceGood = this.SubDevices[0].shelf_layer
      })
    },
    selectDeviceOption (index) {
      this.selectOption = index
      this.DeviceGood = this.SubDevices[index].shelf_layer
      console.log(this.SubDevices[index])
    },
    edit (good) {
      console.log(good)
      this.getGoodTables()
      $('#Modal').modal('show')
    },
    getGoodTables () {
      console.log(this.$H5UI.getChecked('select'))
      this.selectGoodId = 0
      this.$Service.Good.get(this.condition).then(response => {
        this.goods = response.data
      })
    },
    selectGood (good) {
      this.selectGoodId = good.id
      this.form.selectGoodId = good.id
    },
    submit () {
      if (this.selectGoodId == 0) {
        toastr.info('请先选择商品')
        return
      }
      console.log(this.form)
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
</style>
