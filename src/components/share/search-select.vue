<template>
  <div class="input-group searchSelect">
    <input type="text" class="form-control" :id="id">
    <div class="input-group-btn">
      <button type="button" class="btn btn-white dropdown-toggle" data-toggle="dropdown">
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu dropdown-menu-right" role="menu">
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'info-confirm',
  props: {
    id: {
      type: String,
      default: 'searchSelect'
    },
    data: {
      type: Array,
      default: []
    }, // 下拉选项源数据
    keys: {
      type: Array,
      default: function () {
        return ['id', 'name']
      }
    }, // 下拉选项展示key
    valueKey: {
      type: String,
      default: 'id'
    }, // this.id dom 元素 data-id 值
    textKey: {
      type: String,
      default: 'name'
    } // this.id dom 元素 value 值
  },
  data () {
    return {}
  },
  methods: {

  },
  mounted () {
    this.$H5UI.setSearchSelect(this.data, $('#' + this.id), this.keys, this.valueKey, this.textKey)
  }
}
</script>
