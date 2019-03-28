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
const SubDevice = createService('sub_device')
const Manufacturer = createService('manufacturer')
const Good = createService('product') //*
const GoodType = createService('categories') //*
const GoodPrice = createService('productPrice') //*
const GoodUpperShelf = createService('device/channel')
GoodUpperShelf.enable = (request) => { return patch('device/channel', request) }

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

const Device = {
  get: (request) => { return get('device', request) },
  edit: (request) => { return patch('device', request) }
}

function deviceChannels (request) { return get('device/channel', request) }
function register (request) { return post('register', request) }

export default {
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
  Device,
  deviceChannels,
  register
}
