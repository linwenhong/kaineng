<template>
  <button type="button" class="btn"
      :class="[size ? '' : 'btn-sm', type ? 'btn-' + type : 'btn-danger']"
      @click="delConfirm()">{{ text ? text : '删除' }}</button>
</template>

<script>
export default {
  name: 'Delete',
  props: ['item', 'text', 'size', 'type', 'title'],
  data () {
    return {}
  },
  methods: {
    delConfirm: function () {
      const that = this
      const options = {
        title: this.title ? this.title : '您确定删除吗',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnConfirm: true
      }
      swal(options, function () {
        that.$emit('delConfirm', that.item, '确认删除')
      })
    }
  }
}
</script>
