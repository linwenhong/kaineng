webpackJsonp([22],{"34G/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"AdminDevice",data:function(){return{user:this.$store.getters.getUser,tableOptions:[{key:"device_name",title:"设备名称"},{key:"mch_name",title:"所属商户"},{key:"is_normal",title:"是否正常"},{key:"sn",title:"设备sn"},{key:"manufacturer_name",title:"所属制造商"},{key:"deploy_branch_id",title:"布防地点"},{key:"bind_at",title:"关联商户时间"},{key:"activate_at",title:"导入时间"},{key:"is_activate",title:"是否激活"}],items:[],total:0,page:1,pageSize:this.$Config.page_size,condition:{},form:{},validate:null,isSubmit:!1}},methods:{getDataTables:function(){var t=this,e={page_no:arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,page_size:this.pageSize};for(var a in this.condition)this.condition[a]&&(e[a]=this.condition[a]);this.$Service.MerchantDevice.get(e).then(function(e){e.err_code?toastr.error(e.err_msg,e.err_code):(t.items=e.list,t.total=e.total)})},pageChange:function(t){this.getDataTables(t)},clear:function(){this.$H5UI.reset(this.validate),this.form={},this.isSubmit=!1,$("#Modal").modal("hide")},add:function(){this.clear()},checkForm:function(t){return!0},submit:function(){var t=this;if(!this.isSubmit&&$("#form").valid()&&this.checkForm(this.form)){this.isSubmit=!0;var e={mch_id:this.form.mch_id,sn:this.form.sn,channel_sum:Number(this.form.channel_sum),device_name:this.form.device_name};this.$Service.Device.edit(e).then(function(e){t.isSubmit=!1,0==e.err_code?(toastr.success("修改成功"),t.getDataTables(t.page),$("#Modal").modal("hide")):toastr.error(e.err_msg,e.err_code)})}},edit:function(t){this.clear(),this.form={mch_id:t.mch_id,sn:t.sn,channel_sum:t.channel_sum,device_name:t.device_name}},del:function(t){var e=this;this.$Service.Device.del(t.id).then(function(t){200==t.code?(toastr.success("删除成功"),e.getDataTables()):toastr.error(t.msg)})}},created:function(){this.getDataTables()},mounted:function(){this.validate=this.$H5UI.validate("#form")}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrapper wrapper-content"},[a("div",{staticClass:"ibox float-e-margins"},[t._m(0),t._v(" "),a("div",{staticClass:"ibox-content"},[a("div",{staticClass:"search-page"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label"},[t._v("设备sn")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.condition.sn,expression:"condition['sn']",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.condition.sn},on:{input:function(e){e.target.composing||t.$set(t.condition,"sn",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),a("label",{staticClass:"control-label"},[t._v("设备状态")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.condition.status,expression:"condition['status']"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.condition,"status",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("全部")]),t._v(" "),a("option",{attrs:{value:"1"}},[t._v("正常")]),t._v(" "),a("option",{attrs:{value:"2"}},[t._v("待检测")]),t._v(" "),a("option",{attrs:{value:"3"}},[t._v("损坏")])]),t._v(" "),a("button",{staticClass:"btn btn-primary search",attrs:{type:"button"},on:{click:function(e){t.getDataTables()}}},[t._v("查询")])])]),t._v(" "),a("table",{staticClass:"table table-bordered text-center"},[a("thead",[a("tr",t._l(t.tableOptions,function(e){return a("th",[t._v(t._s(e.title))])}))]),t._v(" "),a("tbody",t._l(t.items,function(e,i){return a("tr",{key:e.sn},[a("td",[t._v(t._s(e.device_name))]),t._v(" "),a("td",[t._v(t._s(e.mch_name))]),t._v(" "),a("td",[t._v(t._s(1==e.is_normal?"是":"否"))]),t._v(" "),a("td",[t._v(t._s(e.sn))]),t._v(" "),a("td",[t._v(t._s(e.manufacturer_name))]),t._v(" "),a("td",[t._v(t._s(e.deploy_branch_id))]),t._v(" "),a("td",[t._v(t._s(e.bind_at))]),t._v(" "),a("td",[t._v(t._s(e.activate_at))]),t._v(" "),a("td",[t._v(t._s(2==e.is_activate?"已激活":"未激活"))])])}))]),t._v(" "),a("vue-pagination",{attrs:{"current-page":t.page,total:t.total,"page-size":t.pageSize,theme:"gray"},on:{"current-change":t.pageChange}})],1)]),t._v(" "),a("div",{staticClass:"modal inmodal fade",attrs:{id:"Modal",tabindex:"-1",role:"dialog","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog modal-md"},[a("div",{staticClass:"modal-content"},[t._m(1),t._v(" "),a("form",{staticClass:"form-horizontal",attrs:{id:"form"},on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[a("div",{staticClass:"modal-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("设备名称")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.device_name,expression:"form.device_name",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",name:"device_name"},domProps:{value:t.form.device_name},on:{input:function(e){e.target.composing||t.$set(t.form,"device_name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("货道数量")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.channel_sum,expression:"form.channel_sum"}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",maxlength:"4",oninput:"numberFormat(this)",name:"channel_sum"},domProps:{value:t.form.channel_sum},on:{input:function(e){e.target.composing||t.$set(t.form,"channel_sum",e.target.value)}}})])])])]),t._v(" "),t._m(2)])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ibox-title"},[e("h5",[this._v("设备管理")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")]),e("span",{staticClass:"sr-only"},[this._v("Close")])]),this._v(" "),e("h4",{staticClass:"modal-title"},[this._v("修改设备信息")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-footer"},[e("b",{staticClass:"btn btn-white",attrs:{"data-dismiss":"modal"}},[this._v("关闭")]),this._v(" "),e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[this._v("提交")])])}]};var n=a("VU/8")(i,s,!1,function(t){a("tsK+")},"data-v-11f7b27f",null);e.default=n.exports},"tsK+":function(t,e){}});