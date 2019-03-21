// 订单状态
function OrderStatus (value) {
  let status = ''
  switch (Number(value)) {
    case -1: status = '超时未付款取消'; break;
    case 0: status = '未提交'; break;
    case 1: status = '提交'; break;
    case 2: status = '咨询者接受'; break;
    case 3: status = '咨询者拒绝'; break;
    case 4: status = '待付款'; break;
    case 5: status = '付款成功'; break;
    case 6: status = '订单取消'; break;
    case 7: status = '正在备货'; break;
    case 8: status = '派送中'; break;
    case 9: status = '已签收'; break;
    case 10: status = '已退款'; break;
    case 11: status = '订单完成'; break;
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


let transform = {
  OrderStatus: OrderStatus,
  PayType: PayType
}
export default transform
