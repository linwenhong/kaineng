// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import vuePagination from 'vue-pagination-y'
import Distpicker from 'v-distpicker'
//
import App from '@/App'
import router from '@/router'
import store from '@/stores/index'
import FilterService from '@/assets/filter'
import directives from '@/assets/directive'
// components
import dateTime from '@/components/share/date-time'
import infoConfirm from '@/components/share/info-confirm'
import pageHeaderButton from '@/components/share/page-header-button'
import searchSelect from '@/components/share/search-select'

// import toastr from '../static/js/plugins/toastr/toastr.min'

// Vue.use(toastr)
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(vuePagination);
Vue.component('v-distpicker', Distpicker);
Vue.use(directives);
// global directive

// common components
Vue.component('date-time', dateTime);
Vue.component('info-confirm', infoConfirm);
Vue.component('page-header-button', pageHeaderButton);
Vue.component('search-select', searchSelect);

// eslint-disable-next-line no-undef
Vue.component('treeselect', VueTreeselect.Treeselect);

// defined filter for global
for (let transform in FilterService) {
  Vue.filter(transform, FilterService[transform])
}
// global variable or method
Vue.prototype.$Service = require('@/assets/service/service.js').default;
Vue.prototype.$Config = require('@/assets/config.js');
Vue.prototype.$H5UI = require('@/assets/h5ui.js');
Vue.prototype.$Method = require('@/assets/method.js');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
