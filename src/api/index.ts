import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { ApiResponse } from './todo'

const baseURL = process.env.REACT_APP_API_URL
const token = process.env.REACT_APP_TOKEN

const baseInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

baseInstance.interceptors.response.use(({ data }) => data)

interface ApiRequest {
  get: <T>(url: string, request?: AxiosRequestConfig) => Promise<ApiResponse<T>>
  delete: (url: string, request?: AxiosRequestConfig) => Promise<unknown>
  post: <T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => Promise<ApiResponse<T>>
}

const apiRequest: ApiRequest = {
  get: (url, request) => baseInstance.get(url, request),
  delete: (url, request) => baseInstance.delete(url, request),
  post: (url, data, config) => baseInstance.post(url, data, config)
}

export default apiRequest
