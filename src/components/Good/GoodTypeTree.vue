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

        <div class="text-center" style="margin-top: 30px">
          <button type="button" class="btn btn-primary" @click="confirm">保存修改</button>
        </div>

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
                  <div class="col-sm-8" v-if="TreeSelectOption.length > 0">
                    <treeselect :multiple="false" :options="TreeSelectOption" v-model="form.parent_id"/></treeselect>
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
      user: this.$store.getters.getUser,
      form: {},
      validate: null,
      value: null,
      TreeSelectOption: [],
      batchEditList: [],
      isSubmit: false
    }
  },
  methods: {
    confirm () {
      const request = {
        mch_id: this.user.mch_id,
        list: this.batchEditList
      }
      this.$Service.GoodType.batchEdit(request).then(response => {
        this.isSubmit = false
        if (response.err_code == 0) {
          toastr.success('修改成功')
          this.pageInit()
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })

    },
    updateOutput (e) {
      const list = e.length ? e : $(e.target),
        output = list.data('output')
      const data = list.nestable('serialize')
      console.log(data)
      this.batchEditList = this.$Method.treeToArray(data)
    },
    setNestableHtml (data, html) {
      html.html('');
      data.map(option => {
        let li = '<li class="dd-item"'
            li += 'data-id="' + option.id + '"'
            li += 'data-name="' + option.name + '"'
            li += 'data-order_number="' + option.order_number + '"'
            li += '">'
            li += '<div class="dd-handle">'
            li += '<span class="label label-info"><i class="fa fa-users"></i></span> &nbsp; &nbsp;'
            li += option.name
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
        parent_id: item.parent_id,
        order_number: item.order_number
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

      const request = {
        mch_id: this.user.mch_id,
        name: this.form.name,
        parent_id: this.form.parent_id,
        order_number: this.form.order_number,
        id: this.form.id
      }

      this.$Service.GoodType.edit(request).then(response => {
        this.isSubmit = false
        if (response.err_code == 0) {
          toastr.success('修改成功')
          this.pageInit()
          $('#Modal').modal('hide')
        } else {
          toastr.error(response.err_msg, response.err_code)
        }
      })
    }, // submit end
    pageInit () {
      this.items = []
      this.TreeSelectOption = []
      $('#nestable>ol').html('')
      this.$Service.GoodType.get({
        mch_id: this.user.mch_id,
        page_no: 1,
        page_size: 10000
      }).then(response => {
        if (response.err_code) {
          toastr.error(response.err_msg, response.err_code)
        } else {
          this.items = response.list
          this.total = response.total
          this.TreeSelectOption = this.$Method.getTreeSelectOption(response.list)
          const TreeData = this.$Method.arrayToTree(response.list)
          this.setNestableHtml(TreeData, $('#nestable ol'))
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
        }
      })
      this.validate = this.$H5UI.validate('#form')  //  添加表单验证
    }
  },
  created () {

  },
  mounted () {
    this.pageInit()
  }
}
</script>

<style scoped>
</style>
