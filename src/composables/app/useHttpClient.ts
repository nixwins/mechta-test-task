import axios from '@/libs/axios'
import type { AxiosRequestConfig } from 'axios'

interface RequestConfig extends AxiosRequestConfig {}

export function useHttpClient(config: RequestConfig) {
  return axios(config)
}
