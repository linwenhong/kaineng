webpackJsonp([10],{nA3D:function(t,e){},uuoo:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={name:"register",data:function(){return{password:"",form:{},canSubmit:!0,validate:null}},mounted:function(){this.validate=this.$H5UI.validate("#form")},methods:{cancel:function(){this.$router.push("/login")},register:function(){var t=this;if(this.canSubmit)if($("#form").valid())if(!this.form.mobile||this.form.mobile&&11!=this.form.mobile.length)toastr.info("请输入11位数的电话号码");else if(!this.form.user_phone||this.form.user_phone&&11!=this.form.user_phone.length)toastr.info("请输入11位数的电话号码");else if(this.form.password==Number(this.form.password)||this.form.password.length<6)toastr.info("请输入6位以上的字母加数字的密码");else if(this.password==this.form.password){this.canSubmit=!1;var e={login_name:this.form.login_name,mch_name:this.form.mch_name,mobile:this.form.mobile,password:this.form.password,user_name:this.form.user_name,user_phone:this.form.user_phone};this.$Service.Merchant.add(e).then(function(e){0==e.err_code?(toastr.success("注册成功"),setTimeout(function(){return t.$router.push("/login")},1e3)):(t.canSubmit=!0,toastr.error(e.err_msg,e.err_code))}).catch(function(e){t.canSubmit=!0})}else toastr.info("两次输入的密码不一致");else toastr.info("请补充完善数据后提交")}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"text-center loginscreen  animated fadeInDown login"},[s("h2",{staticClass:"title"},[t._v("商户注册")]),t._v(" "),s("div",{staticClass:"form-horizontal middle-box"},[s("form",{staticClass:"form-horizontal",attrs:{id:"form"},on:{submit:function(e){return e.preventDefault(),t.register(e)}}},[s("div",{staticClass:"form-group"},[t._m(0),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.mch_name,expression:"form.mch_name",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",name:"mch_name"},domProps:{value:t.form.mch_name},on:{input:function(e){e.target.composing||t.$set(t.form,"mch_name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),s("div",{staticClass:"form-group"},[t._m(1),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.mobile,expression:"form.mobile"}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",maxlength:"11",oninput:"numberFormat(this)",name:"mobile"},domProps:{value:t.form.mobile},on:{input:function(e){e.target.composing||t.$set(t.form,"mobile",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[t._m(2),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.login_name,expression:"form.login_name"}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",maxlength:"12",oninput:"NonSpecialSymbolsFormat(this)",name:"login_name"},domProps:{value:t.form.login_name},on:{input:function(e){e.target.composing||t.$set(t.form,"login_name",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[t._m(3),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.user_name,expression:"form.user_name",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",name:"user_name"},domProps:{value:t.form.user_name},on:{input:function(e){e.target.composing||t.$set(t.form,"user_name",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),s("div",{staticClass:"form-group"},[t._m(4),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user_phone,expression:"form.user_phone"}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",maxlength:"11",oninput:"numberFormat(this)",name:"user_phone"},domProps:{value:t.form.user_phone},on:{input:function(e){e.target.composing||t.$set(t.form,"user_phone",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[t._m(5),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.password,expression:"form.password"}],staticClass:"form-control",attrs:{type:"password",required:"","aria-required":"true",oninput:"NonSpecialSymbolsFormat(this)",name:"password"},domProps:{value:t.form.password},on:{input:function(e){e.target.composing||t.$set(t.form,"password",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[t._m(6),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",required:"","aria-required":"true",oninput:"NonSpecialSymbolsFormat(this)",name:"password2"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"submit"},[s("button",{staticClass:"btn btn-primary block full-width",attrs:{type:"submit"}},[t._v("注册")]),t._v(" "),s("b",{staticClass:"btn btn-white block full-width",on:{click:t.cancel}},[t._v("返回登录页")])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"control-label"},[e("span",{staticClass:"MustFill"},[this._v("*")]),this._v("商户名称")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"control-label"},[e("span",{staticClass:"MustFill"},[this._v("*")]),this._v("商户联系电话")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"control-label"},[e("span",{staticClass:"MustFill"},[this._v("*")]),this._v("管理员登录名")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"control-label"},[e("span",{staticClass:"MustFill"},[this._v("*")]),this._v("管理员姓名")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"control-label"},[e("span",{staticClass:"MustFill"},[this._v("*")]),this._v("管理员联系电话")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"control-label"},[e("span",{staticClass:"MustFill"},[this._v("*")]),this._v("密码")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"control-label"},[e("span",{staticClass:"MustFill"},[this._v("*")]),this._v("确认密码")])}]};var o=s("VU/8")(r,a,!1,function(t){s("nA3D")},"data-v-51221a94",null);e.default=o.exports}});