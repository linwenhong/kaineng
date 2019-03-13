import router from '@/router'
export default (Vue)=>{
  // 刷新当前页面
  Vue.directive('my-refresh', {
    bind: function (el) {
      el.onclick = () => {
        router.go(0)
      }
    }
  })
  // 时间指令-结束
  Vue.directive('my-start-time', {
    bind: function (el) {
      el.onclick = () => {
        const data = {
          elem: '#startTime'
        }
        data['max'] = $('#endTime').val()
          ? new Date(new Date($('#endTime').val()).getTime() - 1000*60*60*24).toLocaleDateString()
          : new Date().toLocaleDateString()
        laydate(data)
      }
    }
  })
  // 时间指令-结束
  Vue.directive('my-end-time', {
    bind: function (el) {
      el.onclick = () => {
        const data = {
          elem: '#endTime',
          max: new Date(new Date().getTime() + 1000*60*60*24).toLocaleDateString()
        }
        if ($('#startTime').val()) {
          data['min'] = new Date(new Date($('#startTime').val()).getTime() + 1000*60*60*24).toLocaleDateString()
        }
        laydate(data)
      }
    }
  })

}
