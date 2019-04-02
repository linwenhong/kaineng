import Config from '../config.js'
import BaseService from './base-service.js'

const merchant_url = 'platform/' + Config.merchant_version + '/'
const admin_url = 'maintenance/' + Config.admin_version + '/'

function get (url, request) { return BaseService.get(url, request).then(response => { return response }) }
function post (url, request) { return BaseService.post(url, request).then(response => { return response }) }
function put (url, request) { return BaseService.put(url, request).then(response => { return response }) }
function patch (url, request) { return BaseService.patch(url, request).then(response => { return response }) }
function del (url, request) { return BaseService.del(url, request).then(response => { return response }) }
/******************************/
function createService (url) {
  return {
    get: request => { return get(url, request) },
    details: (request) => { return get(url, request) },
    add: (request) => { return post(url, request) },
    edit: (request) => { return put(url, request) },
    del: (request) => { return del(url, request) }
  }
}
/******************************/
const SubDevice = createService(merchant_url + 'sub_device');
const Manufacturer = createService(merchant_url + 'manufacturer');
const Good = createService(merchant_url + 'product');

const GoodType = createService(merchant_url + 'categories');
GoodType.batchEdit = (request) => { return put(merchant_url + 'categoriesList', request) }

const GoodPrice = createService(merchant_url + 'productPrice');
const GoodUpperShelf = createService(merchant_url + 'device/channel');
GoodUpperShelf.enable = (request) => { return patch(merchant_url + 'device/channel', request) };

const ReplenishOrder = createService(merchant_url + 'replenishOrder');
ReplenishOrder.details = (request) => { return get(merchant_url + 'replenishOrder/details', request) };
ReplenishOrder.detailsAdd = (request) => { return post(merchant_url + 'replenishOrder/details', request) };
ReplenishOrder.edit = (request) => { return put(merchant_url + 'replenishOrder/details', request) };
ReplenishOrder.cancel = (request) => { return patch(merchant_url + 'replenishOrder', request) };

const Merchant = createService(merchant_url + 'merchant');
Merchant.get = (request) => { return get(admin_url + 'merchantList', request) };

const MerchantRegions = createService(merchant_url + 'regions');

const Order = createService(merchant_url + 'paymentOrder');
Order.details = (request) => { return get(merchant_url + 'paymentOrder/details', request) };

const SettlementOrder = createService(merchant_url + 'settledOrder');

const SettlementLogs = createService('settlement_logs');

const User = createService(merchant_url + 'user');
User.editPassword = (request) => { return patch(merchant_url + 'user', request) };

const Auth = {
  login: (request) => { return post(merchant_url + 'auth', request) },
  logout: (request) => { return del(merchant_url + 'auth', request) },
  qrCode: (request) => { return get(merchant_url + 'auth/bind/qrCode', request) },
  loginCode: (request) => { return get(merchant_url + 'auth/login/qrCode', request) },
  codeLogin: (request) => { return get(merchant_url + 'auth', request) },
  untying: (request) => { return patch(merchant_url + 'auth', request) }
}

const Device = {
  get: (request) => { return get(merchant_url + 'device', request) },
  edit: (request) => { return patch(merchant_url + 'device', request) }
}
/******************************/

const AdminAuth = {
  login: (request) => { return post(admin_url + 'auth', request) },
  logout: (request) => { return del(admin_url + 'auth', request) },
  qrCode: (request) => { return get(admin_url + 'auth/bind/qrCode', request) },
  loginCode: (request) => { return get(admin_url + 'auth/login/qrCode', request) },
  codeLogin: (request) => { return get(admin_url + 'auth', request) },
  untying: (request) => { return patch(admin_url + 'auth', request) }
}

const AdminUser = createService(admin_url + 'user')
AdminUser.editPassword = (request) => { return patch(admin_url + 'user', request) };

export default {
  SubDevice,
  Manufacturer,
  Good,
  GoodType,
  GoodPrice,
  GoodUpperShelf,
  ReplenishOrder,
  Merchant,
  MerchantRegions,
  Order,
  SettlementOrder,
  SettlementLogs,
  User,

  Auth,
  Device,

  AdminAuth,
  AdminUser,
}
