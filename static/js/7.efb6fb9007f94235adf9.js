webpackJsonp([7],{lSPC:function(t,e){},s33o:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"GoodType",data:function(){return{user:this.$store.getters.getUser,tableOptions:[{key:"id",title:"ID"},{key:"name",title:"分类名称"},{key:"parent_name",title:"父级分类"}],items:[],total:0,page:1,pageSize:this.$Config.page_size,condition:{type_id:""},form:{},validate:null,TreeSelectOption:[],isSubmit:!1}},methods:{getDataTables:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,i={mch_id:this.user.mch_id,page_no:e,page_size:this.pageSize};for(var a in this.condition)this.condition[a]&&(i[a]=this.condition[a]);this.$Service.GoodType.get(i).then(function(e){e.err_code?toastr.error(e.err_msg,e.err_code):(t.items=e.list,t.total=e.total,t.TreeSelectOption=t.$Method.getTreeSelectOption(e.list))})},pageChange:function(t){this.getDataTables(t)},clear:function(){this.$H5UI.reset(this.validate),this.form={},this.isSubmit=!1,$("#Modal").modal("hide")},add:function(){this.clear()},checkForm:function(t){return!0},submit:function(){var t=this;if(!this.isSubmit&&$("#form").valid()&&this.checkForm(this.form)){this.isSubmit=!0,console.log(this.form);var e={mch_id:this.user.mch_id,name:this.form.name,parent_id:this.form.parent_id||0};this.form.id?(e.id=this.form.id,e.order_number=this.form.order_number,this.$Service.GoodType.edit(e).then(function(e){t.isSubmit=!1,0==e.err_code?(toastr.success("修改成功"),t.getDataTables(t.page),$("#Modal").modal("hide")):toastr.error(e.err_msg,e.err_code)})):(e.mch_id=this.user.mch_id,this.$Service.GoodType.add(e).then(function(e){t.isSubmit=!1,0==e.err_code?(toastr.success("新增成功"),t.getDataTables(),$("#Modal").modal("hide")):toastr.error(e.err_msg,e.err_code)}))}},edit:function(t){this.clear(),this.form={id:t.id,name:t.name,order_number:t.order_number,parent_id:t.parent_id}},del:function(t){var e=this;this.$Service.GoodType.del({id:t.id,mch_id:t.mch_id}).then(function(t){0==t.err_code?(toastr.success("删除成功"),e.getDataTables()):toastr.error(t.err_msg,t.err_code)})}},created:function(){this.getDataTables()},mounted:function(){this.validate=this.$H5UI.validate("#form")}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wrapper wrapper-content"},[i("page-header-button",{on:{add:t.add}}),t._v(" "),i("div",{staticClass:"ibox float-e-margins"},[t._m(0),t._v(" "),i("div",{staticClass:"ibox-content"},[i("div",{staticClass:"search-page"},[i("div",{staticClass:"form-group"},[i("label",{staticClass:"control-label"},[t._v("分类名称")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.condition.name,expression:"condition['name']",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.condition.name},on:{input:function(e){e.target.composing||t.$set(t.condition,"name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),i("button",{staticClass:"btn btn-primary search",attrs:{type:"button"},on:{click:function(e){t.getDataTables()}}},[t._v("查询")])])]),t._v(" "),i("table",{staticClass:"table table-bordered text-center"},[i("thead",[i("tr",[t._l(t.tableOptions,function(e){return i("th",[t._v(t._s(e.title))])}),t._v(" "),i("th",[t._v("操作")])],2)]),t._v(" "),i("tbody",t._l(t.items,function(e,a){return i("tr",{key:e.id},[i("td",[t._v(t._s(e.id))]),t._v(" "),i("td",[t._v(t._s(e.name))]),t._v(" "),i("td",[t._v(t._s(e.parent_name))]),t._v(" "),i("td",[i("button",{staticClass:"btn btn-sm btn-primary",attrs:{type:"button","data-toggle":"modal","data-target":"#Modal"},on:{click:function(i){t.edit(e)}}},[t._v("编辑")]),t._v(" "),i("info-confirm",{attrs:{data:e},on:{confirm:t.del}})],1)])}))]),t._v(" "),i("vue-pagination",{attrs:{"current-page":t.page,total:t.total,"page-size":t.pageSize,theme:"gray"},on:{"current-change":t.pageChange}})],1)]),t._v(" "),i("div",{staticClass:"modal inmodal fade",attrs:{id:"Modal",tabindex:"-1",role:"dialog","aria-hidden":"true"}},[i("div",{staticClass:"modal-dialog modal-md"},[i("div",{staticClass:"modal-content"},[i("div",{staticClass:"modal-header"},[t._m(1),t._v(" "),i("h4",{staticClass:"modal-title"},[t._v(t._s(t.form.id?"修改商品分类":"新增商品分类"))])]),t._v(" "),i("form",{staticClass:"form-horizontal",attrs:{id:"form"},on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[i("div",{staticClass:"modal-body"},[i("div",{staticClass:"row"},[i("div",{staticClass:"form-group"},[i("label",{staticClass:"col-sm-3 control-label"},[t._v("父级分类")]),t._v(" "),t.TreeSelectOption.length>0?i("div",{staticClass:"col-sm-8"},[i("treeselect",{attrs:{multiple:!1,options:t.TreeSelectOption},model:{value:t.form.parent_id,callback:function(e){t.$set(t.form,"parent_id",e)},expression:"form.parent_id"}})],1):t._e()]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{staticClass:"col-sm-3 control-label"},[t._v("分类名称")]),t._v(" "),i("div",{staticClass:"col-sm-8"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.name,expression:"form.name",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",name:"name"},domProps:{value:t.form.name},on:{input:function(e){e.target.composing||t.$set(t.form,"name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])])])]),t._v(" "),t._m(2)])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ibox-title"},[e("h5",[this._v("商品分类管理")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")]),e("span",{staticClass:"sr-only"},[this._v("Close")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-footer"},[e("b",{staticClass:"btn btn-white",attrs:{"data-dismiss":"modal"}},[this._v("关闭")]),this._v(" "),e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[this._v("提交")])])}]};var r=i("VU/8")(a,s,!1,function(t){i("lSPC")},"data-v-63f70021",null);e.default=r.exports}});