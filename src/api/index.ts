import axios, { AxiosResponse } from 'axios'

const baseURL = process.env.REACT_APP_API_URL
const token = process.env.REACT_APP_TOKEN

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

baseInstance.interceptors.response.use(response => response)

const apiRequest = {
  get: <T>(url: string, request?: object) => baseInstance.get<T>(url, request),
  delete: (url: string, request?: object) => baseInstance.delete(url, request),
  post: <T>(url: string, data?: any, config?: object) =>
    baseInstance.post<T>(url, data, config)
}

export default apiRequest
