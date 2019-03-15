export const COMPONENTS = {
  Login: resolve => require(['@/components/login/login'], resolve),
  ModifyPassword: resolve => require(['@/components/login/modifyPassword'], resolve),
  IndexComponent: resolve => require(['@/components/IndexComponent'], resolve),

  UserComponent: resolve => require(['@/components/User/User'], resolve),
  UserDetailsComponent: resolve => require(['@/components/User/UserDetails'], resolve),

  DeviceComponent: resolve => require(['@/components/Device/Device'], resolve),
  ManufacturerComponent: resolve => require(['@/components/Device/Manufacturer'], resolve),
  GoodComponent: resolve => require(['@/components/Good/Good'], resolve),
  GoodTypeComponent: resolve => require(['@/components/Good/GoodType'], resolve),
  GoodTypeTreeComponent: resolve => require(['@/components/Good/GoodTypeTree'], resolve),
  MerchantComponent: resolve => require(['@/components/Merchant/Merchant'], resolve),
  OrderComponent: resolve => require(['@/components/Order/Order'], resolve),
  OrderSettlementComponent: resolve => require(['@/components/Order/OrderSettlement'], resolve),
}
