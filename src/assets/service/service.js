import BaseService from './base-service.js'

function get (url, request) { return BaseService.get(url, request).then(response => { return response }) }
function post (url, request) { return BaseService.post(url, request).then(response => { return response }) }
function put (url, request) { return BaseService.put(url, request).then(response => { return response }) }
function patch (url, request) { return BaseService.patch(url, request).then(response => { return response }) }
function del (url, request) { return BaseService.del(url, request).then(response => { return response }) }
/******************************/
function createService (url) {
  return {
    get: request => { return get(url, request) },
    details: (id, request) => { return get(url + '/' + id, request) },
    add: (request) => { return post(url, request) },
    edit: (request) => { return put(url, request) },
    del: (request) => { return del(url, request) }
  }
}
/******************************/
const Device = createService('device')
const SubDevice = createService('sub_device')
const Manufacturer = createService('manufacturer')
const Good = createService('good')
const GoodType = createService('good_type')
const GoodPrice = createService('good_price')
const GoodUpperShelf = createService('good_upper_shelf')
//const Merchant = createService('merchant')
const Order = createService('order')
const SettlementLogs = createService('settlement_logs')
const User = createService('user')
User.editPassword = (request) => { return patch('user', request) }
/******************************/
const Auth = {
  login: (request) => { return post('auth', request) },
  logout: (request) => { return del('auth', request) }
}
const Merchant = {
  get: request => { return get('merchantList', request) },
  details: (id, request) => { return get('merchant' + '/' + id, request) },
  add: (request) => { return post('merchant', request) },
  edit: (request) => { return put('merchant', request) },
  del: (id, request) => { return del('merchant' + '/' + id, request) }
}

function register (request) { return post('register', request) }

export default {
  Device,
  SubDevice,
  Manufacturer,
  Good,
  GoodType,
  GoodPrice,
  GoodUpperShelf,
  Merchant,
  Order,
  SettlementLogs,
  User,

  Auth,
  register
}
