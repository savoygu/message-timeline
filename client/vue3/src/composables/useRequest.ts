import type { AxiosRequestConfig, Method } from 'axios'
import { doRequest } from '@/http'

interface UseRequestOptions {
  method: Method | 'DOWNLOAD' | 'download' | 'UPLOAD' | 'upload'
  url: string
  params?: any
}

export function useRequest<T>(url: string, params?: any): Promise<T>
export function useRequest<T>(options: UseRequestOptions): Promise<T>
export async function useRequest<T>(
  urlOptions: string | UseRequestOptions,
  params?: any,
) {
  let url
  let method
  if (typeof urlOptions !== 'string') {
    params = urlOptions.params
    method = urlOptions.method
    url = urlOptions.url
  }
  else {
    method = 'GET'
    url = urlOptions
  }

  const config: AxiosRequestConfig = {
    method,
  }

  if (['GET', 'get'].includes(method)) {
    config.params = params
  }
  else if (['DOWNLOAD', 'download'].includes(method)) {
    config.data = params
    config.responseType = 'blob'
    config.headers = {
      'content-type': 'application/json; charset=utf-8',
    }
  }
  else if (['UPLOAD', 'upload'].includes(method)) {
    config.data = params
    config.headers = {
      'Content-Type': 'multipart/form-data',
    }
  }
  else {
    // POST, PATCH, DELETE
    config.data = params
  }

  return doRequest<T>(url, config)
}
