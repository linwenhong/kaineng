// 补充订单状态
function ReplenishOrderStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '未完成'; break;
    case 2: status = '已完成'; break;
    case 3: status = '已取消'; break;
    case 4: status = '所有订单'; break;
    default: status = '其他';
  }
  return status
}
// 补充订单类型
function ReplenishOrderType (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '服务器下单'; break;
    case 2: status = '售货机下单'; break;
    default: status = '其他';
  }
  return status
}
// 交易订单状态
function OrderStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '未完成'; break;
    case 2: status = '已完成'; break;
    case 3: status = '出货失败'; break;
    case 4: status = '退款'; break;
    default: status = '其他';
  }
  return status
}
// 订单结算状态
function OrderSettlementStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '未结算'; break;
    case 2: status = '已结算'; break;
    default: status = '其他';
  }
  return status
}
// 订单商品出货状态
function OrderGoodOutStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '初始状态'; break;
    case 2: status = '出货完成'; break;
    case 3: status = '出货失败'; break;
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

// 通道是否故障
function PassagewayFault (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '无故障'; break;
    default: status = '有故障';
  }
  return status
}

// 通道合并状态
function PassagewayMergeStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '未合并'; break;
    case 2: status = '合并'; break;
    case 3: status = '被合并'; break;
    default: status = '其他';
  }
  return status
}

// 通道启用状态
function PassagewayUsed (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '未启用'; break;
    case 2: status = '已启用'; break;
    default: status = '其他';
  }
  return status
}


let transform = {
  ReplenishOrderStatus: ReplenishOrderStatus,
  ReplenishOrderType: ReplenishOrderType,
  OrderStatus: OrderStatus,
  OrderSettlementStatus: OrderSettlementStatus,
  OrderGoodOutStatus: OrderGoodOutStatus,
  PayType: PayType,
  PassagewayFault: PassagewayFault,
  PassagewayMergeStatus: PassagewayMergeStatus,
  PassagewayUsed: PassagewayUsed,
}
export default transform
