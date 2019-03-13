<template>
  <button type="button" class="btn"
      :class="[enlarge ? '' : 'btn-sm', 'btn-' + type]"
      @click="confirm()">{{ text ? text : '删除' }}</button>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'info-confirm',
  props: {
    data: {
      type: Object,
      default: {}
    }, // 确认返回的值
    type: {
      type: String,
      default: 'danger'
    }, // 按钮类型
    text: {
      type: String,
      default: '删除'
    }, // 按钮文本
    title: {
      type: String,
      default: '确定删除吗'
    }, // 提示文本
    enlarge: {
      type: Boolean,
      default: false
    } // 是否放大按钮
  },
  data () {
    return {}
  },
  methods: {
    confirm () {
      const options = {
        title: this.title ? this.title : '确定删除吗',
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
        this.$emit('confirm', this.data, '确认')
      })
    }
  }
}
</script>
