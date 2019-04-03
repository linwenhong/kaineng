<template>
  <div class="wrapper wrapper-content">

    <page-header-button @add="add"></page-header-button>

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>商品管理</h5>
      </div>

      <div class="ibox-content">
        <div class="search-page">
          <div class="form-group">
            <label class="control-label">商品分类</label>
            <div class="searchOption">
              <treeselect :multiple="false" :options="TreeSelectOption" v-model="condition.category_id"/></treeselect>
            </div>

            <label class="control-label">商品名称</label>
            <input type="text" class="form-control" v-model.trim="condition['name']">

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
            <td>{{ item.category_id }}</td>
            <td>{{ item.spec }}</td>
            <td>{{ item.remark }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#Modal" @click="edit(item)">编辑</button>
              <button type="button" class="btn btn-sm btn-warning" @click="valuation(item)">定价</button>
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
            <h4 class="modal-title">{{ form.id ? '修改商品信息' : '新增商品' }}</h4>
          </div>

          <form id="form" class="form-horizontal" @submit.prevent="submit">
            <div class="modal-body">
              <div class="row">

                <div class="form-group">
                  <label class="col-sm-3 control-label">商品名称</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true"
                           name="product_name" v-model.trim="form.product_name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">商品名称</label>
                  <div class="col-sm-8">
                    <button type="button" class="btn btn-sm btn-primary btn_file"><i class="fa fa-upload"></i>&nbsp;&nbsp;
                      <span class="bold">选择图片</span>
                      <input id="file" type="file" class="file" accept="image/*" @change="preview($event)"/></button>
                    <div class="view-img">
                      <img id="img">
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">商品编码</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control"
                           name="code" v-model.trim="form.code">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">商品类型</label>
                  <div class="col-sm-8">
                    <!--<treeselect :multiple="false" :options="options" v-model="form.type"/></treeselect>-->
                    <select class="form-control"  required="" aria-required="true"
                            name="category_id" v-model="form['category_id']">
                      <option v-for="option of GoodType" :value="option.id">{{ option.name }}</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">商品规格</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control"
                           name="spec" v-model.trim="form.spec">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">备注</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control"
                           name="remark" v-model.trim="form.remark">
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
  name: 'Good',
  data () {
    return {
      user: this.$store.getters.getUser,
      tableOptions: [
        { key: "id", title: "ID" },
        { key: "code", title: "商品编码" },
        { key: "product_name", title: "商品名称" },
        { key: "type", title: "商品类型" },
        { key: "spec", title: "商品规格" },
        { key: "remark", title: "备注" }
      ],
      items: [],
      GoodType: [],
      total: 0,
      page: 1,
      pageSize: this.$Config.page_size,
      condition: {
        type_id: ''
      },
      form: {},
      detailsImgUrl: '',
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
        page_no: page,
        page_size: this.pageSize
      }

      for (const key in this.condition) {
        if (this.condition[key]) {
          condition[key] = this.condition[key]
        }
      }
      condition.category_id = condition.category_id || 0

      this.$Service.Good.get(condition).then(response => {
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
      if (!$('#img').attr('src')) {
        toastr.info('请选择商品图片!')
        return false
      }
      return true
    },
    submit () {
      if (this.isSubmit) return;  // 防止多次提交
      if (!$('#form').valid()) return;  // 必填验证
      if (!this.checkForm(this.form)) return;  // 表单验证
      this.isSubmit = true

      const request = {
        mch_id: this.user.mch_id,
        category_id: this.form.category_id,
        code: this.form.code,
        product_name: this.form.product_name,
        remark: this.form.remark,
        spec: this.form.spec
      }
      if (!this.form.id || (this.form.id && $('#img').attr('src') != this.detailsImgUrl)) {
        request.img = $('#img').attr('src').split('base64,')[1]
        request.img_format = this.form.img_format
      }

      if (this.form.id) { // 修改
        request.id = this.form.id
        request.mch_id = this.valuationGood.mch_id
        this.$Service.Good.edit(request).then(response => {
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
        this.$Service.Good.add(request).then(response => {
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
        category_id: item.category_id,
        code: item.code,
        img_path: item.img_path,
        img_format: item.img_format,
        product_name: item.product_name,
        remark: item.remark,
        spec: item.spec
      }
      this.detailsImgUrl = this.$Config.img_url + item.img_path
      $('#img').attr('src', this.detailsImgUrl)
    },
    del (item) {
      this.$Service.Good.del({ id: item.id, mch_id: item.mch_id }).then(response => {
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
    preview (e) {
      const localSrc = e.target.value
      if (localSrc) {
        const arr = localSrc.split('.')
        this.form.img_format = arr[arr.length - 1]
        this.$H5UI.setImgBase(e, '#img')
      }
    },
    valuation (item) {  // 商品定价管理
      this.$router.push('/merchant/good-price?type_id=' + item.category_id + '&good_id=' + item.id)
    }
  },
  created () {
    this.getGoodType()
    this.getDataTables()
  },
  mounted () {
    this.validate = this.$H5UI.validate('#form')  //  添加表单验证
  }
}
</script>

<style scoped>
</style>
