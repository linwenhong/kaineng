<template>
  <div style="display: inline-block">
    <label class="control-label">{{ text }}</label>
    <input readonly class="form-control layer-date" id="startTime" placeholder="开始时间" v-my-start-time>
    <input readonly class="form-control layer-date" id="endTime" placeholder="结束时间" v-my-end-time>
  </div>

</template>

<script type="text/ecmascript-6">
export default {
  name: 'date-time',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {

  }
}
</script>
