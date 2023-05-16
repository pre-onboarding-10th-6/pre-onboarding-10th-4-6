import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = process.env.REACT_APP_API_URL
const token = process.env.REACT_APP_TOKEN

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

baseInstance.interceptors.response.use(({ data }) => data)

const apiRequest = {
  get: <T>(url: string, request?: AxiosRequestConfig<any>) =>
    baseInstance.get<any, AxiosResponse<T>>(url, request),
  delete: (url: string, request?: AxiosRequestConfig<any>) =>
    baseInstance.delete(url, request),
  post: <T>(url: string, data: any, config?: AxiosRequestConfig<any>) =>
    baseInstance.post<any, AxiosResponse<T>>(url, data, config)
}

export default apiRequest
