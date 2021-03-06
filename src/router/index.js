import Vue from 'vue'
import Router from 'vue-router'

import { COMPONENTS } from './components'
Vue.use(Router)

let routes = new Router({
  //mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/merchant',
      component: COMPONENTS.IndexComponent,
      children: [
        { path: '/', redirect: '/merchant/user' },
        { path: 'role', name: 'role', component: COMPONENTS.RoleComponent },  // 角色管理
        { path: 'roleDetails/:id', name: 'role', component: COMPONENTS.RoleDetailsComponent },  // 角色详情

        { path: 'binding', name: 'user', component: COMPONENTS.BindingComponent },  // 账号绑定
        { path: 'admin-user', name: 'user', component: COMPONENTS.AdminUserComponent },  // 用户管理
        { path: 'user', name: 'user', component: COMPONENTS.UserComponent },  // 用户管理
        { path: 'user/:id', component: COMPONENTS.UserDetailsComponent },  // 用户详情
        { path: 'device', name: 'user', component: COMPONENTS.DeviceComponent },  // 设备管理
        { path: 'device-monitoring', name: 'user', component: COMPONENTS.DeviceMonitoringComponent },  // 设备状态监测
        { path: 'good', name: 'user', component: COMPONENTS.GoodComponent },  // 商品管理
        { path: 'good-price', name: 'user', component: COMPONENTS.GoodPriceComponent },  // 商品价格管理
        { path: 'good-type', name: 'user', component: COMPONENTS.GoodTypeComponent },  // 商品分类管理
        { path: 'good-type-tree', name: 'user', component: COMPONENTS.GoodTypeTreeComponent },  // 商品分类管理(树结构)
        { path: 'good-upper-shelf', name: 'user', component: COMPONENTS.GoodUpperShelfComponent },  // 商品上架
        { path: 'replenish-order', name: 'user', component: COMPONENTS.ReplenishOrderComponent },  // 设备补货记录
        { path: 'merchant-details', name: 'user', component: COMPONENTS.MerchantDetailsComponent },  // 商户信息
        { path: 'merchant-regions', name: 'user', component: COMPONENTS.MerchantRegionsComponent },  // 商户区域管理
        { path: 'order', name: 'user', component: COMPONENTS.OrderComponent },  // 订单管理
        { path: 'order-settlement', name: 'user', component: COMPONENTS.OrderSettlementComponent },  // 订单结算
        { path: 'order-settlement-logs', name: 'user', component: COMPONENTS.OrderSettlementLogsComponent },  // 订单结算记录
      ]
    },
    {
      path: '/admin',
      component: COMPONENTS.IndexComponent,
      children: [
        { path: '/', redirect: '/admin/user' },
        { path: 'user', name: 'user', component: COMPONENTS.AdminUserComponent },  // 用户管理
        { path: 'merchant', name: 'user', component: COMPONENTS.MerchantComponent },  // 商户管理
        { path: 'device', name: 'user', component: COMPONENTS.AdminDeviceComponent },  // 设备管理
        { path: 'manufacturer', name: 'user', component: COMPONENTS.ManufacturerComponent },  // 制造商管理
        { path: 'order', name: 'user', component: COMPONENTS.AdminOrderComponent },  // 订单管理
        { path: 'order-settlement', name: 'user', component: COMPONENTS.AdminOrderSettlementComponent },  // 订单结算
      ]
    },
    {
      path: '/',
      component: COMPONENTS.IndexComponent,
      children: [
        {
          path: 'modify-password/:id',
          component: COMPONENTS.ModifyPasswordComponent
          // 修改密码
        },
        {
          path: 'user-details',
          component: COMPONENTS.UserDetailsComponent
          // 个人信息
        }
      ]
    },
    {
      path: '/admin-login',
      component: COMPONENTS.AdminLoginComponent
      // 管理员登录
    },
    {
      path: '/login',
      component: COMPONENTS.LoginComponent
      // 商户登录
    },
    {
      path: '/register',
      component: COMPONENTS.RegisterComponent
      // 商户注册
    }
    // routes end
  ]
})

import store from '@/stores'
routes.beforeEach((to, from, next) => {
  //console.log(to)
  const user = store.getters.getUser
  if (to.path == '/login' || to.path == '/register' || to.path == '/admin-login') {
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
