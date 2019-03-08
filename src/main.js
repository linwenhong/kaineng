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
import Delete from './components/share/delete'
import myInput from './components/share/input'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(vuePagination)
Vue.component('v-jstree', VJstree)
Vue.component('delete', Delete)
Vue.component('my-input', myInput)

// defined filter for global
for (let transform in FilterService) {
  Vue.filter(transform, FilterService[transform])
}

Vue.prototype.$Service = require('@/assets/service/service.js').default
Vue.prototype.$Config = require('@/assets/config.js')
Vue.prototype.$H5UI = require('@/assets/h5ui.js')
Vue.prototype.$Method = require('@/assets/method.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
