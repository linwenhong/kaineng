webpackJsonp([19],{"9xLM":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"GoodTypeTree",data:function(){return{user:this.$store.getters.getUser,form:{},validate:null,value:null,TreeSelectOption:[],batchEditList:[],isSubmit:!1}},methods:{confirm:function(){var t=this,e={mch_id:this.user.mch_id,list:this.$Method.treeToArray(this.batchEditList)};this.$Service.GoodType.batchEdit(e).then(function(e){t.isSubmit=!1,0==e.err_code?(toastr.success("修改成功"),t.pageInit()):toastr.error(e.err_msg,e.err_code)})},updateOutput:function(t){var e=t.length?t:$(t.target),a=(e.data("output"),e.nestable("serialize"));console.log(a),this.batchEditList=a},setNestableHtml:function(t,e){var a=this;e.html(""),t.map(function(t){var i='<li class="dd-item"';i+='data-id="'+t.id+'"',i+='data-name="'+t.name+'"',i+='data-order_number="'+t.order_number+'"',i+='">',i+='<div class="dd-handle">',i+='<span class="label label-info"><i class="fa fa-users"></i></span> &nbsp; &nbsp;',i+=t.name,i+="</div>",i+="</li>";var s=$(i),r=$('<span class="label label-primary pull-right"><i class="fa fa-edit fa-lg"></i></span>'),n=$('<span class="label label-danger pull-right"><i class="fa fa-trash-o fa-lg"></i></span>');if(r.data(t),n.data(t),s.append(r),s.append(n),t.children&&t.children.length>0){var o=$("<ol class='dd-list'></ol>");s.append(o),e.append(s),a.setNestableHtml(t.children,o)}else e.append(s)})},clear:function(){this.$H5UI.reset(this.validate),this.form={},this.isSubmit=!1},edit:function(t){var e=t.data();this.clear(),this.form={id:e.id,name:e.name,parent_id:e.parent_id,order_number:e.order_number},$("#Modal").modal("show")},del:function(t){swal({title:"确定删除该商品分类吗?",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"确定",cancelButtonText:"取消",closeOnConfirm:!0},function(){$(".sweet-overlay").remove(),$(".sweet-alert").remove(),console.log(t.data())})},checkForm:function(t){return!0},submit:function(){var t=this;if(!this.isSubmit&&$("#form").valid()&&this.checkForm(this.form)){this.isSubmit=!0;var e={mch_id:this.user.mch_id,name:this.form.name,parent_id:this.form.parent_id,order_number:this.form.order_number,id:this.form.id};this.$Service.GoodType.edit(e).then(function(e){t.isSubmit=!1,0==e.err_code?(toastr.success("修改成功"),t.pageInit(),$("#Modal").modal("hide")):toastr.error(e.err_msg,e.err_code)})}},pageInit:function(){var t=this;this.items=[],this.TreeSelectOption=[],$("#nestable>ol").html(""),this.$Service.GoodType.get({mch_id:this.user.mch_id,page_no:1,page_size:1e4}).then(function(e){if(e.err_code)toastr.error(e.err_msg,e.err_code);else{t.items=e.list,t.total=e.total,t.TreeSelectOption=t.$Method.getTreeSelectOption(e.list);var a=t.$Method.arrayToTree(e.list);t.setNestableHtml(a,$("#nestable ol"));var i=t;t.$nextTick(function(){$("#nestable").nestable({group:1}).on("change",t.updateOutput),$("body").on("click",".label-primary",function(){i.edit($(this))}),$("body").on("click",".label-danger",function(){i.del($(this))})})}}),this.validate=this.$H5UI.validate("#form")}},created:function(){},mounted:function(){this.pageInit()}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrapper wrapper-content"},[a("div",{staticClass:"ibox float-e-margins"},[t._m(0),t._v(" "),a("div",{staticClass:"ibox-content"},[t._m(1),t._v(" "),a("div",{staticClass:"text-center",staticStyle:{"margin-top":"30px"}},[a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.confirm}},[t._v("保存修改")])])])]),t._v(" "),a("div",{staticClass:"modal inmodal fade",attrs:{id:"Modal",tabindex:"-1",role:"dialog","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog modal-md"},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[t._m(2),t._v(" "),a("h4",{staticClass:"modal-title"},[t._v(t._s(t.form.id?"修改商品分类":"新增商品分类"))])]),t._v(" "),a("form",{staticClass:"form-horizontal",attrs:{id:"form"},on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[a("div",{staticClass:"modal-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("分类名称")]),t._v(" "),a("div",{staticClass:"col-sm-8"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.name,expression:"form.name",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",name:"name"},domProps:{value:t.form.name},on:{input:function(e){e.target.composing||t.$set(t.form,"name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"col-sm-3 control-label"},[t._v("父级分类")]),t._v(" "),t.TreeSelectOption.length>0?a("div",{staticClass:"col-sm-8"},[a("treeselect",{attrs:{multiple:!1,options:t.TreeSelectOption},model:{value:t.form.parent_id,callback:function(e){t.$set(t.form,"parent_id",e)},expression:"form.parent_id"}})],1):t._e()])])]),t._v(" "),t._m(3)])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ibox-title"},[e("h5",[this._v("商品分类管理")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"dd",attrs:{id:"nestable"}},[e("ol",{staticClass:"dd-list"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")]),e("span",{staticClass:"sr-only"},[this._v("Close")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-footer"},[e("b",{staticClass:"btn btn-white",attrs:{"data-dismiss":"modal"}},[this._v("关闭")]),this._v(" "),e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[this._v("提交")])])}]};var r=a("VU/8")(i,s,!1,function(t){a("j05I")},"data-v-3acd4aec",null);e.default=r.exports},j05I:function(t,e){}});