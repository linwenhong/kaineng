<template>
  <div class="text-right">
    <button type="button" class="btn btn-info" v-my-refresh>刷新</button>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Modal" @click="add()">新增</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'page-header-button',
  props: {

  },
  data () {
    return {}
  },
  mounted () {

  },
  methods: {
    add () {
      this.$emit('add', 'add()')
    }
  }
}
</script>
