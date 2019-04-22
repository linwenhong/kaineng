import axios from 'axios'
import Config from '@/assets/config'
import store from '@/stores'

// 默认请求地址
axios.defaults.baseURL = Config.api_url
// 超时时间
axios.defaults.timeout = 10000

axios.defaults.headers.common['token'] = store.state.user.token

axios.interceptors.response.use(function (response) {
  if (response.data.err_code == 2002) {
    tokenExpire()
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  //console.log(error.response);
  toastr.error(error.response.data, error.response.status)
  return Promise.reject(error);
});


function get (url, request) {
  return axios.get(url, { params: request })
    .then(response => {
      return response['data']
    })
}

function post (url, request) {
  return axios.post(url, request)
    .then(response => {
      return response['data']
    })
}

function put (url, request) {
  return axios.put(url, request)
    .then(response => {
      return response['data']
    })
}

function patch (url, request) {
  return axios.patch(url, request)
    .then(response => {
      return response['data']
    })
}

function del (url, request) {
  if (request) {
    url = url + getUrlQuery(request)
  }
  return axios.delete(url)
    .then(response => {
      return response['data']
    })
}

let tokenInfo = true
function tokenExpire () {
  if (!tokenInfo) return
  tokenInfo = false

  setTimeout(() => {
    tokenInfo = true
    window.location.href = Config.base_url
  }, 1000)
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
