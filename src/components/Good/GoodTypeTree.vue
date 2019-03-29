<template>
  <div class="wrapper wrapper-content">

    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <h5>商品分类管理</h5>
      </div>

      <div class="ibox-content">

        <div class="dd" id="nestable">
          <ol class="dd-list"></ol>
        </div>
        <treeselect v-model="value" :multiple="false" :options="options"/></treeselect>
      </div>
    </div>

    <!-- model -->
    <div class="modal inmodal fade" id="Modal" tabindex="-1" role="dialog"  aria-hidden="true">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">{{ form.id ? '修改商品分类' : '新增商品分类' }}</h4>
          </div>

          <form id="form" class="form-horizontal" @submit.prevent="submit">
            <div class="modal-body">
              <div class="row">

                <div class="form-group">
                  <label class="col-sm-3 control-label">分类名称</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" required="" aria-required="true" name="name" v-model.trim="form.name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">父级分类</label>
                  <div class="col-sm-8">
                    <treeselect :multiple="false" :options="options" v-model="form.parent_id"/></treeselect>
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
  name: 'GoodTypeTree',
  data () {
    return {
      form: {},
      validate: null,
      value: null,
      options: this.$Config.test,
      isSubmit: false
    }
  },
  methods: {
    updateOutput (e) {
      const list = e.length ? e : $(e.target),
        output = list.data('output')
      const data = list.nestable('serialize')
      console.log(data)
      console.log(JSON.stringify(data))
    },
    setNestableHtml (data, html) {
      html.html('');
      data.map(option => {
        let li = '<li class="dd-item" data-id="' + option.id + '" data-label="' + option.id + '">'
            li += '<div class="dd-handle">'
            li += '<span class="label label-info"><i class="fa fa-users"></i></span> &nbsp; &nbsp;'
            li += option.id
            li += '</div>'
            li += '</li>'
        const f = $(li)

        const editBtn = $('<span class="label label-primary pull-right"><i class="fa fa-edit fa-lg"></i></span>')
        const delBtn = $('<span class="label label-danger pull-right"><i class="fa fa-trash-o fa-lg"></i></span>')
        editBtn.data(option)
        delBtn.data(option)
        f.append(editBtn)
        f.append(delBtn)

        if (option.children && option.children.length > 0) {
          const e = $("<ol class='dd-list'></ol>")
          f.append(e)
          html.append(f)
          this.setNestableHtml(option.children, e)
        } else {
          html.append(f)
        }
      })
    },
    clear () {
      this.$H5UI.reset(this.validate)
      this.form = {}
      this.isSubmit = false
    },
    edit (e) {
      const item = e.data()
      this.clear()
      this.form = {
        id: item.id,
        name: item.name,
        parent_id: item.parent_id
      }
      $('#Modal').modal('show')
    },
    del (e) {
      const options = {
        title: '确定删除该商品分类吗?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnConfirm: true
      }
      swal(options, () => {
        $('.sweet-overlay').remove()
        $('.sweet-alert').remove()
        console.log(e.data())
      })
    },
    checkForm (form) {
      return true
    },
    submit () {
      if (this.isSubmit) return;  // 防止多次提交
      if (!$('#form').valid()) return;  // 必填验证
      if (!this.checkForm(this.form)) return;  // 表单验证
      this.isSubmit = true

      console.log(this.form)
      const request = {
        mch_id: this.user.mch_id,
        name: this.form.name,
        parent_id: this.form.parent_id
      }

      const id = this.form.id
      this.$Service.GoodType.edit(id, request).then(response => {
        this.isSubmit = false
        if (response.code == 200) {
          toastr.success('新增成功')
          this.getDataTables(this.page)
        } else {
          toastr.error(response.msg)
        }
      })
    } // submit end
  },
  created () {

  },
  mounted () {
    const testData = [{"label":1,"id":1},{"label":7,"id":7,"children":[{"label":5,"id":5,"children":[{"label":4,"id":4}]},{"label":3,"id":3,"children":[{"label":6,"id":6,"children":[{"label":8,"id":8,"children":[{"label":2,"id":2}]}]}]}]}]
    this.setNestableHtml(testData, $('#nestable ol'))
    const that = this
    this.$nextTick(() => {
      $('#nestable').nestable({
        group: 1
      }).on('change', this.updateOutput);

      $('body').on('click', '.label-primary', function(){
        that.edit($(this))
      });
      $('body').on('click', '.label-danger', function(){
        that.del($(this))
      });
    })
    this.validate = this.$H5UI.validate('#form')  //  添加表单验证
  }
}
</script>

<style scoped>
</style>
