import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

let baseURL = 'http://localhost:3000/api/v1'
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.BASE_URL
}
Vue.axios.defaults.baseURL = baseURL

export function fetch (url, params = {}) {
  return ajax('get', url, params)
}

export function post (url, data = {}) {
  return ajax('post', url, data)
}

export function ajax (type, url, data) {
  data = type === 'get' ? { params: data } : data
  return axios[type](url, data).then((res) => {
    if (res.status === 200) {
      return res.data
    }
  }).catch((err) => {
    console.log(err)
  })
}

export default axios
