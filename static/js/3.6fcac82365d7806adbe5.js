webpackJsonp([3],{"7/Ow":function(t,e){},ty4A:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("mvHQ"),a=s.n(i),n={name:"OrderSettlement",data:function(){return{user:this.$store.getters.getUser,tableOptions:[{key:"out_trade_no",title:"订单号"},{key:"mch_name",title:"商户名"},{key:"trade_status",title:"订单状态"},{key:"total_amount",title:"订单总金额"},{key:"???",title:"是否冻结"},{key:"has_settled",title:"结算状态"},{key:"???",title:"结算金额"},{key:"create_at",title:"下单时间"},{key:"???",title:"结算时间"}],items:[],total:0,page:1,pageSize:this.$Config.page_size,condition:{},lastCondition:{},settlementOrderDetails:{},isSubmit:!1}},watch:{$route:function(t,e){this.pageInit()}},methods:{getDataTables:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,s=$("#startTime").val(),i=$("#endTime").val(),a=$("#searchSelect").attr("data-id");if(s||!i)if(!s||i){var n={mch_id:this.user.mch_id,page_no:e,page_size:this.pageSize};for(var r in this.condition)this.condition[r]?(n[r]=this.condition[r],this.lastCondition[r]=this.condition[r]):delete this.lastCondition[r];s&&i?(n.start_time=s,n.end_time=i,this.lastCondition.start_time=s,this.lastCondition.end_time=i):(delete this.lastCondition.start_time,delete this.lastCondition.end_time),a?(n.name=a,this.lastCondition.name=a):delete this.lastCondition.name,this.$Service.SettlementOrder.get(n).then(function(e){e.err_code?toastr.error(e.err_msg,e.err_code):(t.items=e.list,t.total=e.total,t.$nextTick(function(){return t.$H5UI.iCheck()}))})}else toastr.info("请选择结束时间!");else toastr.info("请选择开始时间!")},pageChange:function(t){this.getDataTables(t)},details:function(t){this.order=t},del:function(t){var e=this;this.$Service.Order.del(t.id).then(function(t){200==t.code?(toastr.success("删除成功"),e.getDataTables()):toastr.error(t.msg)})},settlement:function(t){if("{}"!=a()(this.lastCondition)){var e=this.$H5UI.getChecked("select");this.settlementOrderDetails={ids:e,number:e.length,name:this.lastCondition.name,start_time:this.lastCondition.start_time,end_time:this.lastCondition.end_time},console.log(this.lastCondition),console.log(this.settlementOrderDetails)}else toastr.info("请查询后结算!")},pageInit:function(){this.getDataTables()}},created:function(){this.pageInit()},mounted:function(){}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper wrapper-content"},[s("div",{staticClass:"ibox float-e-margins"},[t._m(0),t._v(" "),s("div",{staticClass:"ibox-content"},[s("div",{staticClass:"search-page"},[s("div",{staticClass:"form-group"},[s("date-time",{attrs:{text:"下单时间"}}),t._v(" "),s("button",{staticClass:"btn btn-primary search",attrs:{type:"button"},on:{click:function(e){t.getDataTables()}}},[t._v("查询")])],1)]),t._v(" "),s("table",{staticClass:"table table-bordered text-center"},[s("thead",[s("tr",[s("th"),t._v(" "),t._l(t.tableOptions,function(e){return s("th",[t._v(t._s(e.title))])}),t._v(" "),s("th",[t._v("操作")])],2)]),t._v(" "),s("tbody",t._l(t.items,function(e,i){return s("tr",{key:e.id},[s("td",[s("div",{staticClass:"checkbox i-checks"},[s("label",[s("input",{attrs:{name:"select",type:"checkbox"},domProps:{value:e.id}}),s("i")])])]),t._v(" "),s("td",[t._v(t._s(e.out_trade_no))]),t._v(" "),s("td",[t._v(t._s(e.mch_name))]),t._v(" "),s("td",[t._v(t._s(t._f("OrderStatus")(e.trade_status)))]),t._v(" "),s("td",[t._v(t._s(e.total_amount))]),t._v(" "),s("td",[t._v(t._s(e.null))]),t._v(" "),s("td",[t._v(t._s(t._f("OrderSettlementStatus")(e.has_settled)))]),t._v(" "),s("td",[t._v(t._s(e.null))]),t._v(" "),s("td",[t._v(t._s(e.create_at))]),t._v(" "),s("td",[t._v(t._s(e.null))]),t._v(" "),s("td")])}))]),t._v(" "),s("vue-pagination",{attrs:{"current-page":t.page,total:t.total,"page-size":t.pageSize,theme:"gray"},on:{"current-change":t.pageChange}})],1)]),t._v(" "),s("div",{staticClass:"modal inmodal fade",attrs:{id:"Modal",tabindex:"-1",role:"dialog","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-md"},[s("div",{staticClass:"modal-content"},[t._m(1),t._v(" "),s("div",{staticClass:"modal-body"},[s("table",{staticClass:"table table-bordered text-center"},[s("tbody",[s("tr",[t._m(2),s("td",[t._v(t._s(t.settlementOrderDetails.name))]),t._v(" "),t._m(3),s("td",[t._v(t._s(t.settlementOrderDetails.name))])]),t._v(" "),s("tr",[t._m(4),s("td",[t._v(t._s(t.settlementOrderDetails.start_time))]),t._v(" "),t._m(5),s("td",[t._v(t._s(t.settlementOrderDetails.end_time))])]),t._v(" "),s("tr",[t._m(6),s("td",[t._v(t._s(t.settlementOrderDetails.number))]),t._v(" "),t._m(7),s("td",[t._v(t._s(t.settlementOrderDetails.test))])]),t._v(" "),s("tr",[t._m(8),s("td",[t._v(t._s(t.settlementOrderDetails.test))]),t._v(" "),t._m(9),s("td",[t._v(t._s(t.settlementOrderDetails.test))])]),t._v(" "),s("tr",[t._m(10),s("td",[t._v(t._s(t.settlementOrderDetails.name))]),t._v(" "),t._m(11),s("td",[t._v(t._s(t.settlementOrderDetails.name))])]),t._v(" "),s("tr",[t._m(12),s("td",[t._v(t._s(t.settlementOrderDetails.name))]),t._v(" "),s("td"),s("td")])])])]),t._v(" "),t._m(13)])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ibox-title"},[e("h5",[this._v("待结算订单")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")]),e("span",{staticClass:"sr-only"},[this._v("Close")])]),this._v(" "),e("h4",{staticClass:"modal-title"},[this._v("订单详情")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("商户名")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("商户账号")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("结算开始时间")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("结算结束时间")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("结算订单数")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("订单总金额")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("结算方式")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("订单金额")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("结算账号")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("结算户名")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("b",[this._v("操作人")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-footer"},[e("b",{staticClass:"btn btn-white",attrs:{"data-dismiss":"modal"}},[this._v("关闭")])])}]};var l=s("VU/8")(n,r,!1,function(t){s("7/Ow")},"data-v-e20cf414",null);e.default=l.exports}});