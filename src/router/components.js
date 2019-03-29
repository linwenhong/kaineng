export const COMPONENTS = {
  LoginComponent: resolve => require(['@/components/auth/login'], resolve),
  RegisterComponent: resolve => require(['@/components/auth/register'], resolve),
  ModifyPasswordComponent: resolve => require(['@/components/auth/modifyPassword'], resolve),
  IndexComponent: resolve => require(['@/components/IndexComponent'], resolve),

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
  MerchantComponent: resolve => require(['@/components/Merchant/Merchant'], resolve),
  MerchantDetailsComponent: resolve => require(['@/components/Merchant/MerchantDetails'], resolve),
  OrderComponent: resolve => require(['@/components/Order/Order'], resolve),
  OrderSettlementComponent: resolve => require(['@/components/Order/OrderSettlement'], resolve),
  OrderSettlementLogsComponent: resolve => require(['@/components/Order/OrderSettlementLogs'], resolve),
}
