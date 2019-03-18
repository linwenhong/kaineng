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


      </div>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'GoodUpperShelf',
  data () {
    return {
      condition: {},
      form: {},
      validate: null,
      isSubmit: false
    }
  },
  methods: {

  },
  created () {

  },
  mounted () {

  }
}
</script>

<style scoped>
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
</style>
