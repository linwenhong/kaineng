// 补充订单状态
function ReplenishOrderStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 0: status = '未完成'; break;
    case 1: status = '已完成'; break;
    case 2: status = '已取消'; break;
    default: status = '其他';
  }
  return status
}
// 补充订单状态
function OrderStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 0: status = '未完成'; break;
    case 1: status = '已完成'; break;
    default: status = '其他';
  }
  return status
}
// 订单商品出货状态
function OrderGoodOutStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 0: status = '初始状态'; break;
    case 1: status = '出货完成'; break;
    case 2: status = '出货失败'; break;
    default: status = '其他';
  }
  return status
}
// 支付类型
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


let transform = {
  ReplenishOrderStatus: ReplenishOrderStatus,
  OrderStatus: OrderStatus,
  OrderGoodOutStatus: OrderGoodOutStatus,
  PayType: PayType
}
export default transform
