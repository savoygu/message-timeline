import type { Ref } from 'vue'
import { useRequest } from './use-request'
import type { Response } from '@/types'

interface FetchOptions {
  url: string
  params?: any
}

export function useFetch<T>(dataRef: Ref<T>, url: string, params?: any): void
export function useFetch<T>(dataRef: Ref<T>, obj: FetchOptions): void
export async function useFetch<T>(
  dataRef: Ref<T>,
  urlOrOptions: string | FetchOptions,
  params?: any,
) {
  try {
    let url
    if (typeof urlOrOptions !== 'string') {
      params = urlOrOptions.params
      url = urlOrOptions.url
    }
    else {
      url = urlOrOptions
    }
    const res = await useRequest<Response<T>>(url, { ...params })
    dataRef.value = res.result
  }
  catch (err) {
    if (Array.isArray(dataRef.value))
      dataRef.value = [] as unknown as T
    else if (dataRef.value !== null && typeof dataRef.value === 'object')
      dataRef.value = {} as unknown as T
  }
}
