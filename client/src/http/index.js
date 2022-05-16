import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = process.env.BASE_URL

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
