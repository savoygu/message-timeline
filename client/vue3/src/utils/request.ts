import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL

// 拦截器
axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  return error
})

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  return error
})

export function doRequest<T>(
  url: string,
  options: AxiosRequestConfig = {},
) {
  return axios({
    url,
    method: options.method || 'GET',
    ...options, // baseURL, headers, params, data, cancelToken, responseType
  }).then((response: AxiosResponse<T>) => {
    return response.data
  }).catch((error: AxiosError) => {
    return error.response ?? error
  })
}

export default axios
