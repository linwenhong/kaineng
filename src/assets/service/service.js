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
    details: (request) => { return get(url, request) },
    add: (request) => { return post(url, request) },
    edit: (request) => { return put(url, request) },
    del: (request) => { return del(url, request) }
  }
}
/******************************/
const Device = createService('device')
const SubDevice = createService('sub_device')
const Manufacturer = createService('manufacturer')
const Good = createService('product') //*
const GoodType = createService('categories') //*
const GoodPrice = createService('good_price')
const GoodUpperShelf = createService('good_upper_shelf')

const Merchant = createService('merchant') //*
Merchant.get = request => { return get('merchantList', request) }

const Order = createService('order')
const SettlementLogs = createService('settlement_logs')

const User = createService('user') //*
User.editPassword = (request) => { return patch('user', request) }
/******************************/
const Auth = {
  login: (request) => { return post('auth', request) },
  logout: (request) => { return del('auth', request) },
  qrCode: (request) => { return get('auth/bind/qrCode', request) }
}
//const Merchant = {
//  get: request => { return get('merchantList', request) },
//  details: (request) => { return get('merchant', request) },
//  add: (request) => { return post('merchant', request) },
//  edit: (request) => { return put('merchant', request) },
//  del: (request) => { return del('merchant', request) }
//}

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
