// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import vuePagination from 'vue-pagination-y'

import App from './App'
import router from './router'
import FilterService from '@/assets/filter'
// components
import VJstree from 'vue-jstree'
import infoConfirm from './components/share/info-confirm'
import pageHeaderButton from './components/share/page-header-button'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(vuePagination)
Vue.component('v-jstree', VJstree)
Vue.component('info-confirm', infoConfirm)
Vue.component('page-header-button', pageHeaderButton)

// defined filter for global
for (let transform in FilterService) {
  Vue.filter(transform, FilterService[transform])
}

Vue.prototype.$Service = require('@/assets/service/service.js').default
Vue.prototype.$Config = require('@/assets/config.js')
Vue.prototype.$H5UI = require('@/assets/h5ui.js')
Vue.prototype.$Method = require('@/assets/method.js')

// directive
Vue.directive('my-refresh', {
  // 当被绑定的元素插入到 DOM 中时……
  bind: function (el) {
    el.onclick = () => {
      router.go(0)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
