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
      component: COMPONENTS.LoginComponent
      // 登录
    },
    {
      path: '/register',
      component: COMPONENTS.RegisterComponent
      // 登录
    },
    {
      path: '/modifyPassword',
      component: COMPONENTS.ModifyPasswordComponent
      // 修改密码
    },
    {
      path: '/editUserPassword/:id',
      component: COMPONENTS.ModifyPasswordComponent
      // 修改员工密码
    }
    // routes end
  ]
})

import store from '@/stores'
routes.beforeEach((to, from, next) => {
  console.log(to)
  const user = store.getters.getUser

  if (to.path == '/login') {
    next()
  } else { // 登录验证
    if (!user || !user.id) {
      next('/login')
    } else {
      next()
    }
  }
})

export default routes
