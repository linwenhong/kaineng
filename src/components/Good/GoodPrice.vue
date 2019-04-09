<template>
  <div class="wrapper wrapper-content">

    <page-header-button @add="add"></page-header-button>

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>商品价格管理</h5>
      </div>

      <div class="ibox-content">
        <div class="search-page">
          <div class="form-group">
            <!--<label class="control-label">商品分类</label>-->
            <!--<div class="searchOption">-->
              <!--<treeselect :multiple="false" :options="TreeSelectOption" v-model="condition.category_id"/></treeselect>-->
            <!--</div>-->

            <label class="control-label">商品名称</label>
            <div class="searchOption">
              <template v-if="GoodList.length > 0">
                <search-select
                  :data="GoodList"
                  :keys="['id', 'product_name']"
                  valueKey="id"
                  textKey="product_name"
                ></search-select>
              </template>
            </div>

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
            <td>{{ item.id }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.category_name }}</td>
            <td>{{ item.spec }}</td>
            <td>¥ {{ item.purchase_price }}</td>
            <td>¥ {{ item.selling_price }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#Modal" @click="edit(item)">编辑</button>
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
            <h4 class="modal-title">{{ form.id ? '修改商品价格' : '新增商品价格' }}</h4>
          </div>

          <form id="form" class="form-horizontal" @submit.prevent="submit">
            <div class="modal-body">
              <div class="row">

                <div class="form-group">
                  <label class="col-sm-3 control-label">商品名称</label>
                  <div class="col-sm-8">
                    <template v-if="GoodList.length > 0">
                      <search-select
                        id="good"
                        :data="GoodList"
                        :keys="['id', 'product_name']"
                        valueKey="id"
                        textKey="product_name"
                      ></search-select>
                    </template>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">商品进货价</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control"
                           oninput="moneyFormat(this)" name="purchase_price" v-model="form.purchase_price">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">商品销售价</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true"
                           oninput="moneyFormat(this)" name="selling_price" v-model="form.selling_price">
                  </div>
                </div>

              </div>
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
  name: 'GoodPrice',
  data () {
    return {
      typeId: this.$route.query['type_id'],
      goodId: this.$route.query['good_id'],
      user: this.$store.getters.getUser,
      tableOptions: [
        { key: "id", title: "ID" },
        { key: "code", title: "商品编码" },
        { key: "product_name", title: "商品名称" },
        { key: "category_name", title: "商品类型" },
        { key: "spec", title: "商品规格" },
        { key: "purchase_price", title: "商品进货价" },
        { key: "selling_price", title: "商品销售价" }
      ],
      items: [],
      GoodType: [],
      GoodList: [],
      total: 0,
      page: 1,
      pageSize: this.$Config.page_size,
      condition: {
        type_id: ''
      },
      form: {},
      valuationGood: {},
      validate: null,
      value: null,
      TreeSelectOption: [],
      isSubmit: false
    }
  },
  methods: {
    getDataTables (page = 1) {
      const condition = {
        mch_id: this.user.mch_id,
        product_id: $('#searchSelect').attr('data-id') || this.goodId,
        page_no: page,
        page_size: this.pageSize
      }

      for (const key in this.condition) {
        if (this.condition[key]) {
          condition[key] = this.condition[key]
        }
      }

      this.$Service.GoodPrice.get(condition).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          this.items = response.list
          this.total = response.total
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
      $('#good').val('')
      $('#good').attr('data-id', '')
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
        mch_id: this.user.mch_id,
        product_id: Number($('#good').attr('data-id')),
        selling_price: Number(this.form.selling_price),
        purchase_price: Number(this.form.purchase_price)
      }

      if (this.form.id) { // 修改
        request.id = this.form.id
//        request.mch_id = this.form.mch_id
        request.mch_id = this.user.mch_id
        this.$Service.GoodPrice.edit(request).then(response => {
          this.isSubmit = false
          if (response.err_code == 0) {
            toastr.success('修改成功')
            this.getDataTables(this.page)
            $('#Modal').modal('hide')
          } else {
            toastr.error(response.err_msg, response.err_code)
          }
        })
      } else {  // 新增
        request.mch_id = this.user.mch_id
        this.$Service.GoodPrice.add(request).then(response => {
          this.isSubmit = false
          if (response.err_code == 0) {
            toastr.success('新增成功')
            this.getDataTables()
            $('#Modal').modal('hide')
          } else {
            toastr.error(response.err_msg, response.err_code)
          }
        })
      }

    },
    edit (item) {
      this.clear()
      this.form = {
        id: item.id,
        mch_id: item.mch_id,
        product_id: item.product_id,
        selling_price: item.selling_price,
        purchase_price: item.purchase_price
      }
      $('#good').attr('data-id', item.product_id)
      $('#good').val(this.getValuationGood().product_name)
    },
    del (item) {
      this.$Service.GoodPrice.del({ id: item.id, mch_id: item.mch_id }).then(response => {
        if (response.err_code == 0) {
          toastr.success('删除成功')
          this.getDataTables()
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })
    },
    getGoodType () {
      const condition = {
        mch_id: this.user.mch_id,
        page_no: 1,
        page_size: 10000
      }
      this.$Service.GoodType.get(condition).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          this.GoodType = response.list
          this.TreeSelectOption = this.$Method.getTreeSelectOption(response.list, true)
        }
      })
    },
    getGoodList () {
      const condition = {
        mch_id: this.user.mch_id,
        category_id: 0,
        page_no: 1,
        page_size: 10000
      }
      this.$Service.Good.get(condition).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          this.GoodList = response.list
        }
      })
    },
    getValuationGood () {
      const id = $('#searchSelect').attr('data-id') || this.goodId
      for (const good of this.GoodList) {
        if (good.id == id) {
          this.valuationGood = good
          break
        }
      }
      return this.valuationGood
    }
  },
  created () {
//    this.getGoodType()
    this.getGoodList()
    this.getDataTables()
  },
  mounted () {
    this.validate = this.$H5UI.validate('#form')  //  添加表单验证
  }
}
</script>

<style scoped>
</style>
