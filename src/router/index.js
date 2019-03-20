import Vue from 'vue'
import Router from 'vue-router'

import { COMPONENTS } from './components'
Vue.use(Router)

let routes = new Router({
  //mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/admin',
      component: COMPONENTS.IndexComponent,
      children: [
        { path: '/', redirect: '/admin/user' },
        { path: 'role', name: 'role', component: COMPONENTS.RoleComponent },  // 角色管理
        { path: 'roleDetails/:id', name: 'role', component: COMPONENTS.RoleDetailsComponent },  // 角色详情
        { path: 'user', name: 'user', component: COMPONENTS.UserComponent },  // 用户管理
        { path: 'user/:id', component: COMPONENTS.UserDetailsComponent },  // 用户详情

        { path: 'device', name: 'user', component: COMPONENTS.DeviceComponent },  // 设备管理
        { path: 'device-monitoring', name: 'user', component: COMPONENTS.DeviceMonitoringComponent },  // 设备状态监测
        { path: 'manufacturer', name: 'user', component: COMPONENTS.ManufacturerComponent },  // 制造商管理
        { path: 'good', name: 'user', component: COMPONENTS.GoodComponent },  // 商品管理
        { path: 'good-type', name: 'user', component: COMPONENTS.GoodTypeComponent },  // 商品分类管理
        { path: 'good-type-tree', name: 'user', component: COMPONENTS.GoodTypeTreeComponent },  // 商品分类管理(树结构)
        { path: 'good-upper-shelf', name: 'user', component: COMPONENTS.GoodUpperShelfComponent },  // 商品上架
        { path: 'merchant', name: 'user', component: COMPONENTS.MerchantComponent },  // 商户管理
        { path: 'merchant-details', name: 'user', component: COMPONENTS.MerchantDetailsComponent },  // 商户信息
        { path: 'order', name: 'user', component: COMPONENTS.OrderComponent },  // 订单管理
        { path: 'order-settlement', name: 'user', component: COMPONENTS.OrderSettlementComponent },  // 订单结算
        { path: 'order-settlement-logs', name: 'user', component: COMPONENTS.OrderSettlementLogsComponent },  // 订单结算记录
      ]
    },
    {
      path: '/login',
      component: COMPONENTS.Login
      // 登录
    },
    {
      path: '/modifyPassword',
      component: COMPONENTS.ModifyPassword
      // 修改密码
    },
    {
      path: '/editUserPassword/:id',
      component: COMPONENTS.ModifyPassword
      // 修改员工密码
    }
    // routes end
  ]
})

import Cache from '@/assets/cache'
routes.beforeEach((to, from, next) => {
  console.log(to)
  next()
  return

  if ((!Cache.getUser() ||  !Cache.getUser().id) && to.path != '/login') {
    next({ path: '/login' })
  }

  if (to.path != '/login') {
    if ($.inArray('admin', Cache.getUser().permission) != -1) { // 超级用户
      console.log('超级用户')
      next()
    } else if (to.name) { // 权限验证
      console.log('权限验证')
      if ($.inArray(to.name, Cache.getUser().permission) == -1) {
        next({ path: '/login' })
      } else {
        next()
      }
    } else if (to.path == '/admin/Order') { // 特殊处理
      console.log('特殊处理')
      // Order: 所有订单 to_do_order: 待审核订单 unusual_order_cancel: 异常订单取消 unusual_order_refund: 异常订单退款
      console.log('order')
      next()
    } else {
      console.log('无验证')
      next()
    }
  } else {  // 登录
    next()
  }
})

export default routes
