<template>
  <div class="wrapper wrapper-content">

    <page-header-button @add="add"></page-header-button>

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>商户区域管理</h5>
      </div>

      <div class="ibox-content">
        <div class="search-page">
          <div class="form-group">
            <label class="control-label">商户名称</label>
            <input type="text" class="form-control" v-model.trim="condition['mch_name']">

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
            <td>{{ item.mch_name }}</td>
            <td>{{ item.province }}, {{ item.city }}, {{ item.county }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.scene }}</td>
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
            <h4 class="modal-title">{{ form.id ? '修改商户信息' : '新增商户' }}</h4>
          </div>

          <form id="form" class="form-horizontal" @submit.prevent="submit">
            <div class="modal-body">
              <div class="row">

                <div class="form-group">
                  <label class="col-sm-3 control-label">所在地区</label>
                  <div class="col-sm-8">
                    <v-distpicker
                      :province="form.province" :city="form.city" :area="form.county"
                      @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">详细地址</label>
                  <div class="col-sm-8">
                    <textarea type="text" class="form-control" required="" aria-required="true"
                              name="address" v-model.trim="form.address"></textarea>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">场景</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true"
                           name="scene" v-model.trim="form.scene">
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
  components: {
  },
  name: 'Merchant',
  data () {
    return {
      user: this.$store.getters.getUser,
      tableOptions: [
        { key: "id", title: "ID" },
        { key: "mch_name", title: "商户名称" },
        { key: "province, city, county", title: "所在地区" },
        { key: "user_type_name", title: "详细地址" },
        { key: "account_name", title: "场景" }
      ],
      items: [],
      total: 0,
      page: 1,
      pageSize: this.$Config.page_size,
      condition: {},
      form: {},
      validate: null,
      isSubmit: false
    }
  },
  methods: {
    onChangeProvince (data) {
      this.form['province'] = data.value
    },
    onChangeCity (data) {
      this.form['city'] = data.value
    },
    onChangeArea (data) {
      this.form['county'] = data.value
    },
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

      this.$Service.MerchantRegions.get(condition).then(response => {
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
      $('#Modal').modal('hide')
    },
    add () {
      this.clear()
    },
    checkForm (form) {
      if (!form.province || !form.city || !form.county) {
        toastr.info('请选择省、市、区')
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
        province: this.form.province,
        city: this.form.city,
        county: this.form.county,
        address: this.form.address,
        scene: this.form.scene
      }

      if (this.form.id) { // 修改
        request.id = this.form.id
        this.$Service.MerchantRegions.edit(request).then(response => {
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
        this.$Service.MerchantRegions.add(request).then(response => {
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
        province: item.province,
        city: item.city,
        county: item.county,
        address: item.address,
        scene: item.scene
      }
    },
    del (item) {
      this.$Service.MerchantRegions.del({ id: item.id }).then(response => {
        if (response.err_code == 0) {
          toastr.success('删除成功')
          this.getDataTables()
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })
    }
  },
  created () {
    this.getDataTables()
  },
  mounted () {
    this.validate = this.$H5UI.validate('#form')  //  添加表单验证
  }
}
</script>

<style scoped>
</style>
