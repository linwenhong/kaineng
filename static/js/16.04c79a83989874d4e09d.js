webpackJsonp([16],{RHSO:function(t,e){},wpu7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={name:"Merchant",data:function(){return{tableOptions:[{key:"id",title:"ID"},{key:"user_name",title:"管理员名称"},{key:"user_phone",title:"管理员电话"},{key:"mch_name",title:"商户名称"},{key:"mobile",title:"商户联系电话"},{key:"user_type_name",title:"账户类型"},{key:"account_name",title:"结算账户姓名"},{key:"bank_name",title:"开户支行"},{key:"bank_no",title:"银行卡号"},{key:"wechat_id",title:"微信号"}],items:[],total:0,page:1,pageSize:this.$Config.page_size,condition:{},form:{},password:null,validate:null,isSubmit:!1}},methods:{getDataTables:function(){var t=this,e={page_no:arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,page_size:this.pageSize};for(var a in this.condition)this.condition[a]&&(e[a]=this.condition[a]);this.$Service.Merchant.get(e).then(function(e){e.err_code?toastr.error(e.err_msg,e.err_code):(t.items=e.list,t.total=e.total,t.$nextTick(function(){return t.$H5UI.iCheck()}))})},pageChange:function(t){this.getDataTables(t)},clear:function(){this.$H5UI.reset(this.validate),this.form={},this.password=null,this.isSubmit=!1,$("#Modal").modal("hide")},add:function(){this.clear()},checkForm:function(t){return 11!=t.mobile.length?(toastr.info("请输入11位数的电话号码!"),!1):11!=t.user_phone.length?(toastr.info("请输入11位数的电话号码!"),!1):t.bank_name&&!t.bank_no||!t.bank_name&&t.bank_no?(toastr.info('"开户支行"与"银行卡号"为共存关系, 只可都填或都不填!'),!1):t.password&&(t.password==Number(t.password)||t.password.length<6)?void toastr.info("请输入6位以上的字母加数字的密码"):!t.password||t.password==this.password||(toastr.info("两次输入的密码不同!"),!1)},submit:function(){var t=this;if(!this.isSubmit&&$("#form").valid()&&this.checkForm(this.form)){this.isSubmit=!0;var e={account_name:this.form.account_name,mch_name:this.form.mch_name,mobile:this.form.mobile};this.form.wechat_id&&(e.wechat_id=this.form.wechat_id),this.form.bank_name&&(e.bank_name=this.form.bank_name,e.bank_no=this.form.bank_no),this.form.id?(e.mch_id=this.form.mch_id,this.$Service.Merchant.edit(e).then(function(e){t.isSubmit=!1,0==e.err_code?(toastr.success("修改成功"),t.getDataTables(t.page),$("#Modal").modal("hide")):toastr.error(e.err_msg,e.err_code)})):(e.login_name=this.form.login_name,e.password=this.form.password,e.user_name=this.form.user_name,e.user_phone=this.form.user_phone,this.$Service.Merchant.add(e).then(function(e){t.isSubmit=!1,0==e.err_code?(toastr.success("新增成功"),t.getDataTables(),$("#Modal").modal("hide")):toastr.error(e.err_msg,e.err_code)}))}},edit:function(t){this.clear(),this.form={id:t.id,mch_id:t.mch_id,account_name:t.account_name,login_name:t.login_name,mch_name:t.mch_name,mobile:t.mobile,user_name:t.user_name,user_phone:t.user_phone,wechat_id:t.wechat_id,bank_name:t.bank_name,bank_no:t.bank_no}},del:function(t){var e=this;this.$Service.Merchant.del({id:t.id}).then(function(t){0==t.err_code?(toastr.success("删除成功"),e.getDataTables()):toastr.error(t.err_msg,t.err_code)})},EnabledTest:function(){$("#Modal").modal("show"),this.form={account_name:"这是一个结算户名",login_name:"login_name_test",mch_name:"一点点",mobile:"15478855447",password:"test123",user_name:"测试用户",user_phone:"18312553218"},this.form.wechat_id="wechat15478855445",this.form.bank_name="中国银行",this.form.bank_no="6216665000001788266",this.password="test123",this.submit()}},created:function(){this.getDataTables()},mounted:function(){this.validate=this.$H5UI.validate("#form")}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrapper wrapper-content"},[a("page-header-button",{on:{add:t.add}}),t._v(" "),a("div",{staticClass:"ibox float-e-margins"},[t._m(0),t._v(" "),a("div",{staticClass:"ibox-content"},[a("div",{staticClass:"search-page"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label"},[t._v("商户名称")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.condition.mch_name,expression:"condition['mch_name']",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.condition.mch_name},on:{input:function(e){e.target.composing||t.$set(t.condition,"mch_name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),a("button",{staticClass:"btn btn-primary search",attrs:{type:"button"},on:{click:function(e){t.getDataTables()}}},[t._v("查询")])])]),t._v(" "),a("table",{staticClass:"table table-bordered text-center"},[a("thead",[a("tr",[t._l(t.tableOptions,function(e){return a("th",[t._v(t._s(e.title))])}),t._v(" "),a("th",[t._v("操作")])],2)]),t._v(" "),a("tbody",t._l(t.items,function(e,o){return a("tr",{key:e.id},[a("td",[t._v(t._s(e.id))]),t._v(" "),a("td",[t._v(t._s(e.user_name))]),t._v(" "),a("td",[t._v(t._s(e.user_phone))]),t._v(" "),a("td",[t._v(t._s(e.mch_name))]),t._v(" "),a("td",[t._v(t._s(e.mobile))]),t._v(" "),a("td",[t._v(t._s(e.user_type_name))]),t._v(" "),a("td",[t._v(t._s(e.account_name))]),t._v(" "),a("td",[t._v(t._s(e.bank_name))]),t._v(" "),a("td",[t._v(t._s(e.bank_no))]),t._v(" "),a("td",[t._v(t._s(e.wechat_id))]),t._v(" "),a("td",[a("button",{staticClass:"btn btn-sm btn-primary",attrs:{type:"button","data-toggle":"modal","data-target":"#Modal"},on:{click:function(a){t.edit(e)}}},[t._v("编辑")]),t._v(" "),a("info-confirm",{attrs:{data:e},on:{confirm:t.del}})],1)])}))]),t._v(" "),a("vue-pagination",{attrs:{"current-page":t.page,total:t.total,"page-size":t.pageSize,theme:"gray"},on:{"current-change":t.pageChange}})],1)]),t._v(" "),a("div",{staticClass:"modal inmodal fade",attrs:{id:"Modal",tabindex:"-1",role:"dialog","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog modal-md"},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[t._m(1),t._v(" "),a("h4",{staticClass:"modal-title"},[t._v(t._s(t.form.id?"修改商户信息":"新增商户"))])]),t._v(" "),a("form",{staticClass:"form-horizontal",attrs:{id:"form"},on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[a("div",{staticClass:"modal-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("管理员登录名")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.login_name,expression:"form.login_name",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",oninput:"NonSpecialSymbolsFormat(this)",name:"login_name"},domProps:{value:t.form.login_name},on:{input:function(e){e.target.composing||t.$set(t.form,"login_name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("管理员姓名")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.user_name,expression:"form.user_name",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",name:"user_name"},domProps:{value:t.form.user_name},on:{input:function(e){e.target.composing||t.$set(t.form,"user_name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("管理员电话")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user_phone,expression:"form.user_phone"}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",maxlength:"11",oninput:"numberFormat(this)",name:"user_phone"},domProps:{value:t.form.user_phone},on:{input:function(e){e.target.composing||t.$set(t.form,"user_phone",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("商户名称")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.mch_name,expression:"form.mch_name",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",name:"mch_name"},domProps:{value:t.form.mch_name},on:{input:function(e){e.target.composing||t.$set(t.form,"mch_name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("商户联系电话")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.mobile,expression:"form.mobile"}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",maxlength:"11",oninput:"numberFormat(this)",name:"mobile"},domProps:{value:t.form.mobile},on:{input:function(e){e.target.composing||t.$set(t.form,"mobile",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("结算账户姓名")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.account_name,expression:"form.account_name",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",name:"account_name"},domProps:{value:t.form.account_name},on:{input:function(e){e.target.composing||t.$set(t.form,"account_name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),t.form.id?[a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("结算微信号")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.wechat_id,expression:"form.wechat_id",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",name:"wechat_id"},domProps:{value:t.form.wechat_id},on:{input:function(e){e.target.composing||t.$set(t.form,"wechat_id",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("银行卡开户支行")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.bank_name,expression:"form.bank_name",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",name:"bank_name"},domProps:{value:t.form.bank_name},on:{input:function(e){e.target.composing||t.$set(t.form,"bank_name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("银行卡号")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.bank_no,expression:"form.bank_no",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",name:"bank_no"},domProps:{value:t.form.bank_no},on:{input:function(e){e.target.composing||t.$set(t.form,"bank_no",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])])]:[a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("结算微信号")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.wechat_id,expression:"form.wechat_id",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",name:"wechat_id"},domProps:{value:t.form.wechat_id},on:{input:function(e){e.target.composing||t.$set(t.form,"wechat_id",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("银行卡开户支行")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.bank_name,expression:"form.bank_name",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",name:"bank_name"},domProps:{value:t.form.bank_name},on:{input:function(e){e.target.composing||t.$set(t.form,"bank_name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("银行卡号")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.bank_no,expression:"form.bank_no",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",name:"bank_no"},domProps:{value:t.form.bank_no},on:{input:function(e){e.target.composing||t.$set(t.form,"bank_no",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])])],t._v(" "),t.form.id?t._e():[a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("密码")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.password,expression:"form.password",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"password",required:"","aria-required":"true",oninput:"NonSpecialSymbolsFormat(this)",name:"password"},domProps:{value:t.form.password},on:{input:function(e){e.target.composing||t.$set(t.form,"password",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("确认密码")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.password,expression:"password",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"password",required:"","aria-required":"true",oninput:"NonSpecialSymbolsFormat(this)",name:"confirmPassword"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])])]],2)]),t._v(" "),t._m(2)])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ibox-title"},[e("h5",[this._v("商户管理")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")]),e("span",{staticClass:"sr-only"},[this._v("Close")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-footer"},[e("b",{staticClass:"btn btn-white",attrs:{"data-dismiss":"modal"}},[this._v("关闭")]),this._v(" "),e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[this._v("提交")])])}]};var r=a("VU/8")(o,s,!1,function(t){a("RHSO")},"data-v-17d54604",null);e.default=r.exports}});