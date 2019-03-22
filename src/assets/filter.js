// 订单状态
function OrderStatus (value) {
  let status = ''
  switch (Number(value)) {
    case -1: status = '超时未付款取消'; break;
    case 0: status = '未提交'; break;
    case 1: status = '待付款'; break;
    case 2: status = '付款成功'; break;
    case 3: status = '订单取消'; break;
    case 4: status = '订单完成'; break;
    default: status = '其他';
  }
  return status
}
// 咨询订单类型
function PayType (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '微信'; break;
    case 2: status = '支付宝'; break;
    case 3: status = '银行卡'; break;
    case 4: status = '现金支付'; break;
    default: status = '其他';
  }
  return status
}
// 用户状态
function UserStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '新注册'; break;
    case 2: status = '正常'; break;
    case 3: status = '禁用'; break;
    default: status = '其他';
  }
  return status
}


let transform = {
  OrderStatus: OrderStatus,
  PayType: PayType,
  UserStatus: UserStatus
}
export default transform
