webpackJsonp([11],{DFio:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"GoodUpperShelf",data:function(){return{user:this.$store.getters.getUser,goods:[],selectOption:0,selectGoodId:0,selectDevice:{},valuationGood:{},goodPrices:[],passageway:{},condition:{},deviceName:"",goodName:"",lastSelectDeviceIndex:0,DevicePassageways:[],Passageways:[],MerchantDevice:[],SubDevices:[],DeviceGood:[],validate:null,isSubmit:!1}},methods:{getDataTables:function(){var e=this;this.SubDevices=[],this.DeviceGood=[];var t={mch_id:this.user.mch_id,page_no:1,page_size:1e4};this.deviceName&&(t.name=this.deviceName),this.$Service.Device.get(t).then(function(t){t.err_code?toastr.error(t.err_msg,t.err_code):(e.MerchantDevice=t.list,e.total=t.total,e.MerchantDevice.length>0&&e.selectMerchantDevice(e.MerchantDevice[e.lastSelectDeviceIndex],e.lastSelectDeviceIndex))})},selectMerchantDevice:function(e,t){var s=this;this.selectDevice=e,this.lastSelectDeviceIndex=t,console.log("device",e),this.$Service.GoodUpperShelf.get({mch_id:e.mch_id,device_id:e.sn,page_no:1,page_size:1e4}).then(function(e){e.err_code?toastr.error(e.err_msg,e.err_code):(s.SubDevices=[],s.DevicePassageways=e.list,e.list.map(function(e){if(e.channel_no>999&&e.channel_no<1e4){var t=e.channel_no.toString(),i=Number(t.slice(0,1)),a=Number(t.slice(1,2));if(!s.SubDevices[i-1]||!s.SubDevices[i-1].name)switch(i){case 1:s.SubDevices[0]={},s.SubDevices[0].name="主柜",s.SubDevices[0].shelf_layer=[];break;case 2:s.SubDevices[1]={},s.SubDevices[1].name="左柜",s.SubDevices[1].shelf_layer=[];break;case 3:s.SubDevices[2]={},s.SubDevices[2].name="右柜",s.SubDevices[2].shelf_layer=[];break;default:console.log("编号首位非1-3")}s.SubDevices[i-1].shelf_layer[a]&&s.SubDevices[i-1].shelf_layer[a].name||(s.SubDevices[i-1].shelf_layer[a]={name:"第"+(a+1)+"层",passageways:[]}),s.SubDevices[i-1].shelf_layer[a].passageways.push(e)}else console.log("channel_no非4位数字")}),s.selectDeviceOption(0))})},selectDeviceOption:function(e){this.selectOption=e,this.DeviceGood=this.SubDevices[e].shelf_layer,console.log("sub_device",this.SubDevices[e])},edit:function(e){this.selectGoodId=0,console.log("passageway",e),this.passageway=e,$("#Modal").modal("show")},enable:function(e){var t=this;console.log("passageway",e),this.$Service.GoodUpperShelf.enable({id:e.id,device_id:e.device_id,used:2==e.used?1:2}).then(function(s){s.err_code?toastr.error(s.err_msg,s.err_code):(toastr.success((2==e.used?"关闭":"启用")+"成功"),$("#Modal").modal("hide"),t.getDataTables())})},getGoodTables:function(){var e=this,t={page_no:1,page_size:1e4,mch_id:this.user.mch_id,category_id:10008};this.goodName&&(t.name=this.goodName),this.$H5UI.getChecked("select")[0]&&(t.all=1),this.selectGoodId=0,this.$Service.Good.get(t).then(function(t){t.err_code?toastr.error(t.err_msg,t.err_code):e.goods=t.list})},selectGood:function(e){var t=this;this.selectGoodId!=e.id&&(this.valuationGood=e,this.selectGoodId=e.id,this.goodPrices=e.product_prices,this.$nextTick(function(){t.$H5UI.iCheck(),t.$H5UI.clearRadio(),t.$H5UI.setRadioVal("price",0)}))},submit:function(){var e=this;if(0!=this.selectGoodId){var t=Number(this.$H5UI.getRadioVal("price"));if(t||0==t){var s={mch_id:this.user.mch_id,id:this.passageway.id,category_id:this.valuationGood.category_id,category_name:this.valuationGood.category_name,product_id:this.valuationGood.id,product_name:this.valuationGood.product_name,price_id:this.goodPrices[t].id,product_price:this.goodPrices[t].selling_price};console.log(s),console.log(this.valuationGood),this.$Service.GoodUpperShelf.edit({list:[s]}).then(function(t){t.err_code?toastr.error(t.err_msg,t.err_code):($("#Modal").modal("hide"),e.getDataTables())})}else toastr.info("请选择商品价格")}else toastr.info("请先选择商品")},replenish:function(){this.Passageways=this.DevicePassageways.map(function(e){return{channel_no:e.channel_no,product_name:e.product_name,spec:e.spec,price:e.product_price,residue:e.product_sum}}),console.log(this.Passageways)},replenishConfirm:function(){var e=this;console.log(this.Passageways),this.$Service.ReplenishOrder.add({mch_id:this.user.mch_id,device_id:this.selectDevice.sn,list:this.Passageways}).then(function(t){t.err_code?toastr.error(t.err_msg,t.err_code):($("#Modal").modal("hide"),e.getDataTables())})},replenishOrderHistory:function(){this.$router.push("/merchant/replenish-order?device_id="+this.selectDevice.sn)}},created:function(){this.getDataTables()},mounted:function(){this.$H5UI.iCheck()}},a={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"wrapper wrapper-content"},[s("div",{staticClass:"ibox float-e-margins"},[e._m(0),e._v(" "),s("div",{staticClass:"device-list"},[s("div",{staticClass:"search-page device-search"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.deviceName,expression:"deviceName",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.deviceName},on:{input:function(t){t.target.composing||(e.deviceName=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}}),e._v(" "),s("button",{staticClass:"btn btn-primary search",attrs:{type:"button"},on:{click:function(t){e.getDataTables()}}},[e._v("查询")])]),e._v(" "),s("ul",e._l(e.MerchantDevice,function(t,i){return s("li",{on:{click:function(s){e.selectMerchantDevice(t,i)}}},[s("p",[e._v(e._s(i+1)+"."+e._s(t.device_name))]),e._v(" "),s("p",[e._v("地址: "+e._s(t.deploy_branch_id))]),e._v(" "),s("p",[e._v("联系人: "+e._s(t.mch_name)+" "+e._s(t.mch_id))])])}))]),e._v(" "),s("div",{staticClass:"ibox-content"},[e.SubDevices.length>0?s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-primary",attrs:{type:"button","data-toggle":"modal","data-target":"#Modal2"},on:{click:function(t){e.replenish()}}},[e._v("货道补货")]),e._v(" "),s("button",{staticClass:"btn btn-info",attrs:{type:"button"},on:{click:function(t){e.replenishOrderHistory()}}},[e._v("补货记录")])]):e._e(),e._v(" "),s("div",{staticClass:"form-group device"},[e._v("\n        柜号:\n        "),e._l(e.SubDevices,function(t,i){return[s("button",{staticClass:"btn btn-sm",class:e.selectOption==i?"btn-info":"btn-default",attrs:{type:"button"},on:{click:function(t){e.selectDeviceOption(i)}}},[e._v(e._s(t.name))])]})],2),e._v(" "),s("table",{staticClass:"table table-bordered text-center"},[e._m(1),e._v(" "),s("tbody",e._l(e.DeviceGood,function(t,i){return s("tr",[s("td",[e._v(e._s(t.name))]),e._v(" "),e._l(t.passageways,function(t){return s("td",[2==t.merge_status?[e._v("\n                被合并\n              ")]:[s("div",{staticClass:"good",on:{click:function(s){e.edit(t)}}},[s("div",{staticClass:"good-icon-box"},[s("img",{staticClass:"good-icon",attrs:{src:e.$Config.img_url+t.img_path}})]),e._v(" "),s("div",{staticClass:"good-icon-box"},[s("p",[s("small",[e._v("售价: ¥ "+e._s(t.product_price))])]),e._v(" "),s("p",[s("small",[e._v("库存: "+e._s(t.product_sum))])])]),e._v(" "),s("p",{staticClass:"text"},[e._v("\n                    "+e._s(t.product_name)+"\n                    "),t.spec?s("small",[e._v("("+e._s(t.spec)+")")]):e._e()]),e._v(" "),s("span",{staticClass:"left"},[e._v("状态:\n                    "),s("span",{class:2==t.used?"green":"red"},[e._v(e._s(e._f("PassagewayUsed")(t.used)))])]),e._v(" "),s("span",{staticClass:"right"},[s("small",[e._v("货道号: "+e._s(t.channel_no))])])])]],2)})],2)}))])])]),e._v(" "),s("div",{staticClass:"modal inmodal fade",attrs:{id:"Modal",tabindex:"-1",role:"dialog","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-md"},[s("div",{staticClass:"modal-content"},[e._m(2),e._v(" "),s("div",{staticClass:"modal-body"},[s("p",{staticClass:"passageway-number"},[e._v("当前货道号:\n            "),s("font",{attrs:{color:"red"}},[e._v(e._s(e.passageway.channel_no))]),e._v(" "),s("button",{staticClass:"btn btn-sm btn-danger",attrs:{type:"button"},on:{click:function(t){e.enable(e.passageway)}}},[e._v(e._s(2==e.passageway.used?"关闭":"启用"))])],1),e._v(" "),s("form",{staticClass:"form-horizontal",attrs:{id:"form"},on:{submit:function(t){return t.preventDefault(),e.getGoodTables(t)}}},[s("div",{staticClass:"search-page"},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.goodName,expression:"goodName",modifiers:{trim:!0}}],staticClass:"form-control search-name",attrs:{type:"text",placeholder:"输入商品名称，回车查询"},domProps:{value:e.goodName},on:{input:function(t){t.target.composing||(e.goodName=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}}),e._v(" "),e._m(3)])]),e._v(" "),s("button",{staticClass:"btn btn-primary",staticStyle:{display:"none"},attrs:{type:"submit"}},[e._v("提交")])]),e._v(" "),s("table",{staticClass:"table table-bordered text-center"},[e._m(4),e._v(" "),s("tbody",e._l(e.goods,function(t,i){return s("tr",{key:t.id,class:e.selectGoodId==t.id?"hover":"",on:{click:function(s){e.selectGood(t)}}},[s("td",[e._v(e._s(t.id))]),e._v(" "),s("td",[e._v(e._s(t.product_name))]),e._v(" "),s("td",[e._v(e._s(t.spec))]),e._v(" "),s("td",[e._v("商户添加")])])}))]),e._v(" "),e.selectGoodId>0?s("div",{staticClass:"form-group"},[s("p",[e._v("请选择商品价格")]),e._v(" "),e._l(e.goodPrices,function(t,i){return s("div",{staticClass:"radio i-checks"},[s("label",[s("input",{attrs:{type:"radio",name:"price"},domProps:{value:i}}),e._v("¥ "+e._s(t.selling_price)+"\n              ")])])})],2):e._e()]),e._v(" "),s("div",{staticClass:"modal-footer"},[s("b",{staticClass:"btn btn-white",attrs:{"data-dismiss":"modal"}},[e._v("关闭")]),e._v(" "),s("b",{staticClass:"btn btn-primary",on:{click:e.submit}},[e._v("提交")])])])])]),e._v(" "),s("div",{staticClass:"modal inmodal fade",attrs:{id:"Modal2",tabindex:"-1",role:"dialog","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-md"},[s("div",{staticClass:"modal-content"},[e._m(5),e._v(" "),s("form",{staticClass:"form-horizontal",attrs:{id:"form2"},on:{submit:function(t){return t.preventDefault(),e.replenishConfirm(t)}}},[s("div",{staticClass:"modal-body"},[s("table",{staticClass:"table table-bordered text-center"},[e._m(6),e._v(" "),s("tbody",e._l(e.Passageways,function(t,i){return s("tr",{key:t.id},[s("td",[e._v(e._s(t.channel_no))]),e._v(" "),s("td",[e._v(e._s(t.product_name))]),e._v(" "),s("td",[e._v(e._s(t.spec))]),e._v(" "),s("td",[e._v(e._s(t.residue))]),e._v(" "),s("td",{staticStyle:{width:"100px"}},[s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.require_sum,expression:"passageway.require_sum",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"text",required:"","aria-required":"true",maxlength:"4",oninput:"numberFormat(this)",name:"require_sum"},domProps:{value:t.require_sum},on:{input:function(s){s.target.composing||e.$set(t,"require_sum",e._n(s.target.value))},blur:function(t){e.$forceUpdate()}}})])])}))])]),e._v(" "),e._m(7)])])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"ibox-title"},[t("h5",[this._v("商品上架")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("thead",[t("tr",[t("th",[this._v("货架层")]),this._v(" "),t("th",{attrs:{colspan:"3"}},[this._v("货物通道信息")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-header"},[t("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal"}},[t("span",{attrs:{"aria-hidden":"true"}},[this._v("×")]),t("span",{staticClass:"sr-only"},[this._v("Close")])]),this._v(" "),t("h4",{staticClass:"modal-title"},[this._v("选择上架商品")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"checkbox i-checks"},[t("label",[t("input",{attrs:{name:"select",type:"checkbox",value:"1"}}),t("i"),this._v("包含系统商品(不选只查询自添加商品)")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("thead",[t("tr",[t("th",[this._v("ID")]),this._v(" "),t("th",[this._v("商品名称")]),this._v(" "),t("th",[this._v("规格")]),this._v(" "),t("th",[this._v("商品来源")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-header"},[t("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal"}},[t("span",{attrs:{"aria-hidden":"true"}},[this._v("×")]),t("span",{staticClass:"sr-only"},[this._v("Close")])]),this._v(" "),t("h4",{staticClass:"modal-title"},[this._v("补货")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("thead",[s("tr",[s("th",[e._v("货道号")]),e._v(" "),s("th",[e._v("商品")]),e._v(" "),s("th",[e._v("规格")]),e._v(" "),s("th",[e._v("库存")]),e._v(" "),s("th",[e._v("补货数量")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-footer"},[t("b",{staticClass:"btn btn-white",attrs:{"data-dismiss":"modal"}},[this._v("关闭")]),this._v(" "),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[this._v("提交")])])}]};var o=s("VU/8")(i,a,!1,function(e){s("xiep")},"data-v-538388be",null);t.default=o.exports},xiep:function(e,t){}});