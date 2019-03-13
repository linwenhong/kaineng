export const COMPONENTS = {
  Login: resolve => require(['@/components/login/login'], resolve),
  ModifyPassword: resolve => require(['@/components/login/modifyPassword'], resolve),
  IndexComponent: resolve => require(['@/components/IndexComponent'], resolve),

  UserComponent: resolve => require(['@/components/User/User'], resolve),
  UserDetailsComponent: resolve => require(['@/components/User/UserDetails'], resolve),

  OrderComponent: resolve => require(['@/components/Order/Order'], resolve),
}
