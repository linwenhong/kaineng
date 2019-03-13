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
const Device = createService('device.json')
const Manufacturer = createService('good.json')
const Good = createService('good.json')
const Merchant = createService('merchant.json')
const Order = createService('order.json')
const User = createService('user.json')

export default {
  Device,
  Manufacturer,
  Good,
  Merchant,
  Order,
  User
}
