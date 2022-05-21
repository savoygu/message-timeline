import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL

export function fetch<T>(url: string, params = {}) {
  return ajax<T>('get', url, params)
}

export function post<T>(url: string, data = {}) {
  return ajax<T>('post', url, data)
}

export function ajax<T>(
  type: 'get' | 'post',
  url: string,
  data: Record<string, any>
) {
  data = type === 'get' ? { params: data } : data
  return axios[type]<T>(url, data)
    .then((res) => {
      if (res.status === 200) {
        return res.data
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export default axios
