import BaseService from './base-service.js'

function get (url, request) { return BaseService.get(url, request).then(response => { return response }) }
function post (url, request) { return BaseService.post(url, request).then(response => { return response }) }
function put (url, request) { return BaseService.put(url, request).then(response => { return response }) }
function del (url, request) { return BaseService.del(url, request).then(response => { return response }) }
/******************************/
function createService (url) {
  return {
    get: request => { return get(url, request) },
    details: (id, request) => { return get(url + '/' + id, request) },
    add: (request) => { return post(url, request) },
    edit: (id, request) => { return put(url + '/' + id, request) },
    del: (id, request) => { return del(url + '/' + id, request) }
  }
}
/******************************/
const Device = createService('device')
const SubDevice = createService('sub_device')
const Manufacturer = createService('manufacturer')
const Good = createService('good')
const GoodType = createService('good_type')
const GoodUpperShelf = createService('good_upper_shelf')
const Merchant = createService('merchant')
const Order = createService('order')
const User = createService('user')

export default {
  Device,
  SubDevice,
  Manufacturer,
  Good,
  GoodType,
  GoodUpperShelf,
  Merchant,
  Order,
  User
}
