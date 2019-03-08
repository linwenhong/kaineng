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
// 订单异常状态
function OrderErrorStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '未审核'; break;
    case 2: status = '审核通过'; break;
    case 3: status = '审核不通过'; break;
    case 4: status = '药店取消订单'; break;
    case 5: status = '平台取消'; break;
    case 6: status = '部分退款'; break;
    case 7: status = '全额退款'; break;
  }
  return status
}
// 订单类型
function OrderType (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '咨询建议订单'; break;
    case 2: status = '咨询订单'; break;
    case 3: status = '就医陪护订单'; break;
  }
  return status
}
// 咨询订单类型
function ConsultationOrderType (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '首次咨询费'; break;
    case 2: status = '再次咨询费'; break;
    case 3: status = '年费'; break;
    case 4: status = '转诊费'; break;
  }
  return status
}
// 咨询者/医生/平台用户账户状态
function UserStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 0: status = '新注册'; break;
    case 1: status = '正常'; break;
    case 2: status = '被禁用'; break;
  }
  return status
}

// 药品状态
function DrugStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 0: status = '禁用'; break;
    case 1: status = '正常'; break;
    case 2: status = '未定价'; break;
  }
  return status
}

let transform = {
  OrderStatus: OrderStatus,
  OrderErrorStatus: OrderErrorStatus,
  OrderType: OrderType,
  ConsultationOrderType: ConsultationOrderType,
  UserStatus: UserStatus,
  DrugStatus: DrugStatus
}
export default transform
