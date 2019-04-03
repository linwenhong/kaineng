export const COMPONENTS = {
  AdminLoginComponent: resolve => require(['@/components/auth/adminLogin'], resolve),
  LoginComponent: resolve => require(['@/components/auth/login'], resolve),
  RegisterComponent: resolve => require(['@/components/auth/register'], resolve),
  ModifyPasswordComponent: resolve => require(['@/components/auth/modifyPassword'], resolve),
  IndexComponent: resolve => require(['@/components/IndexComponent'], resolve),

  BindingComponent: resolve => require(['@/components/User/Binding'], resolve),

  UserComponent: resolve => require(['@/components/User/User'], resolve),
  UserDetailsComponent: resolve => require(['@/components/User/UserDetails'], resolve),

  DeviceComponent: resolve => require(['@/components/Device/Device'], resolve),
  DeviceMonitoringComponent: resolve => require(['@/components/Device/DeviceMonitoring'], resolve),
  ManufacturerComponent: resolve => require(['@/components/Device/Manufacturer'], resolve),
  GoodComponent: resolve => require(['@/components/Good/Good'], resolve),
  GoodPriceComponent: resolve => require(['@/components/Good/GoodPrice'], resolve),
  GoodTypeComponent: resolve => require(['@/components/Good/GoodType'], resolve),
  GoodTypeTreeComponent: resolve => require(['@/components/Good/GoodTypeTree'], resolve),
  GoodUpperShelfComponent: resolve => require(['@/components/Good/GoodUpperShelf'], resolve),
  ReplenishOrderComponent: resolve => require(['@/components/Good/ReplenishOrder'], resolve),
  MerchantDetailsComponent: resolve => require(['@/components/Merchant/MerchantDetails'], resolve),
  MerchantRegionsComponent: resolve => require(['@/components/Merchant/MerchantRegions'], resolve),
  OrderComponent: resolve => require(['@/components/Order/Order'], resolve),
  OrderSettlementComponent: resolve => require(['@/components/Order/OrderSettlement'], resolve),
  OrderSettlementLogsComponent: resolve => require(['@/components/Order/OrderSettlementLogs'], resolve),


  AdminUserComponent: resolve => require(['@/components/User/AdminUser'], resolve),
  MerchantComponent: resolve => require(['@/components/Merchant/Merchant'], resolve),
  AdminDeviceComponent: resolve => require(['@/components/Device/AdminDevice'], resolve),
  AdminOrderSettlementComponent: resolve => require(['@/components/Order/AdminOrderSettlement'], resolve),
}
