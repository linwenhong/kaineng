import axios from 'axios'
import Config from '@/assets/config'

// 默认请求地址
axios.defaults.baseURL = Config.api_url
// 超时时间
axios.defaults.timeout = 10000

function get (url, request) {
  return axios.get(url, { params: request })
    .then(response => {
      if (response.data.status == 401) {
        tokenExpire()
      }
      return response['data']
    })
    .catch(error => responseError(error))
}

function post (url, request) {
  return axios.post(url, request)
    .then(response => {
      if (response.data.status == 401) {
        tokenExpire()
      }
      return response['data']
    })
    .catch(error => responseError(error))
}

function put (url, request) {
  return axios.put(url, request)
    .then(response => {
      if (response.data.status == 401) {
        tokenExpire()
      }
      return response['data']
    })
    .catch(error => responseError(error))
}

function patch (url, request) {
  return axios.patch(url, request)
    .then(response => {
      if (response.data.status == 401) {
        tokenExpire()
      }
      return response['data']
    })
    .catch(error => responseError(error))
}

function del (url, request) {
  if (request) {
    url = url + getUrlQuery(request)
  }
  return axios.delete(url)
    .then(response => {
      if (response.data.status == 401) {
        tokenExpire()
      }
      return response['data']
    })
    .catch(error => responseError(error))
}

function responseError (error) {
  console.log(error)
  toastr.error('接口数据未能成功返回', '请求异常')
}

let tokenInfo = true
function tokenExpire () {
  if (!tokenInfo) return
  tokenInfo = false

  setTimeout(() => {
    tokenInfo = true
    window.location.href = Config.base_url
  }, 2000)
}

function getUrlQuery (request) {
  let result = '?'
  let isFirst = true
  for (const key in request) {
    if (isFirst) {
      isFirst = false
      result += key + '=' + request[key]
    } else {
      result += '&' + key + '=' + request[key]
    }
  }
  return result
}

export default { get, post, put, del, patch }
