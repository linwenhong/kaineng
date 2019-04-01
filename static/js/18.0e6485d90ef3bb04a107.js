webpackJsonp([18],{"1ven":function(t,e){},ZKg8:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"DeviceMonitoring",data:function(){return{tableOptions:[{key:"id",title:"ID"},{key:"sn",title:"设备sn"},{key:"name",title:"设备名称"},{key:"coding",title:"设备柜体编号"},{key:"merchant",title:"商户名称"},{key:"error_source",title:"告警源类型"},{key:"error_content",title:"告警内容"},{key:"error_time",title:"告警时间"},{key:"staff",title:"维护人员"},{key:"phone",title:"联系电话"}],items:[],total:0,page:1,pageSize:this.$Config.page_size,dateOption:0,condition:{},validate:null,isSubmit:!1}},methods:{getDataTables:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.items=[],this.total=0;var i={page:e,per_number:this.pageSize};for(var n in this.condition)this.condition[n]&&(i[n]=this.condition[n]);this.dateOption>0?(i.start_time=this.$Method.formatDate((new Date).getTime()-864e5*(this.dateOption-1),"yyyy-MM-dd"),i.end_time=this.$Method.formatDate((new Date).getTime()+864e5,"yyyy-MM-dd")):$("#startTime").val()&&$("#endTime").val()&&(i.start_time=$("#startTime").val(),i.end_time=$("#endTime").val()),this.$Service.SubDevice.get(i).then(function(e){200==e.code?(t.items=e.data,t.total=e.total,t.$nextTick(function(){return t.$H5UI.iCheck()})):toastr.error(e.msg)})},pageChange:function(t){this.getDataTables(t)},selectDateOption:function(t){this.dateOption=this.dateOption==t?0:t}},created:function(){this.getDataTables()},mounted:function(){this.validate=this.$H5UI.validate("#form")}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wrapper wrapper-content"},[i("div",{staticClass:"ibox float-e-margins"},[t._m(0),t._v(" "),i("div",{staticClass:"ibox-content"},[i("div",{staticClass:"search-page"},[i("div",{staticClass:"form-group"},[i("label",{staticClass:"control-label"},[t._v("告警日期")]),t._v(" "),i("button",{staticClass:"btn",class:1==t.dateOption?"btn-info":"btn-default",attrs:{type:"button"},on:{click:function(e){t.selectDateOption(1)}}},[t._v("今天")]),t._v(" "),i("button",{staticClass:"btn",class:3==t.dateOption?"btn-info":"btn-default",attrs:{type:"button"},on:{click:function(e){t.selectDateOption(3)}}},[t._v("3天内")]),t._v(" "),i("button",{staticClass:"btn",class:7==t.dateOption?"btn-info":"btn-default",attrs:{type:"button"},on:{click:function(e){t.selectDateOption(7)}}},[t._v("7天内")]),t._v(" "),i("date-time",{attrs:{text:"自定义时间"}})],1),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{staticClass:"control-label"},[t._v("商户名称")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.condition.merchant,expression:"condition['merchant']",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.condition.merchant},on:{input:function(e){e.target.composing||t.$set(t.condition,"merchant",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),i("label",{staticClass:"control-label"},[t._v("设备sn")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.condition.sn,expression:"condition['sn']",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.condition.sn},on:{input:function(e){e.target.composing||t.$set(t.condition,"sn",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),i("label",{staticClass:"control-label"},[t._v("告警源类型")]),t._v(" "),i("select",{directives:[{name:"model",rawName:"v-model",value:t.condition.status,expression:"condition['status']"}],staticClass:"form-control",on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.condition,"status",e.target.multiple?i:i[0])}}},[i("option",{attrs:{value:""}},[t._v("全部")]),t._v(" "),i("option",{attrs:{value:"1"}},[t._v("正常")]),t._v(" "),i("option",{attrs:{value:"2"}},[t._v("待检测")]),t._v(" "),i("option",{attrs:{value:"3"}},[t._v("损坏")])]),t._v(" "),i("button",{staticClass:"btn btn-primary search",attrs:{type:"button"},on:{click:function(e){t.getDataTables()}}},[t._v("查询")])])]),t._v(" "),i("table",{staticClass:"table table-bordered text-center"},[i("thead",[i("tr",t._l(t.tableOptions,function(e){return i("th",[t._v(t._s(e.title))])}))]),t._v(" "),i("tbody",t._l(t.items,function(e,n){return i("tr",{key:e.id},[i("td",[t._v(t._s(e.id))]),t._v(" "),i("td",[t._v(t._s(e.device.sn))]),t._v(" "),i("td",[t._v(t._s(e.device.name))]),t._v(" "),i("td",[t._v(t._s(e.coding))]),t._v(" "),i("td",[t._v(t._s(e.device.merchant.name))]),t._v(" "),i("td",[t._v(t._s(e.error_source))]),t._v(" "),i("td",[t._v(t._s(e.error_content))]),t._v(" "),i("td",[t._v(t._s(e.error_time))]),t._v(" "),i("td",[t._v(t._s(e.device.staff))]),t._v(" "),i("td",[t._v(t._s(e.device.phone))])])}))]),t._v(" "),i("vue-pagination",{attrs:{"current-page":t.page,total:t.total,"page-size":t.pageSize,theme:"gray"},on:{"current-change":t.pageChange}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ibox-title"},[e("h5",[this._v("设备状态监测")])])}]};var o=i("VU/8")(n,a,!1,function(t){i("1ven")},"data-v-0d2266a0",null);e.default=o.exports}});