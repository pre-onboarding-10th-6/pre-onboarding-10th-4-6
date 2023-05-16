import axios, { AxiosRequestConfig } from 'axios'

const baseURL = process.env.REACT_APP_API_URL
const token = process.env.REACT_APP_TOKEN

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

baseInstance.interceptors.response.use(({ data }) => data)

interface Request {
  [key: string]: object
}

const apiRequest = {
  get: (url: string, request?: Request) => baseInstance.get(url, request),
  delete: (url: string, request?: Request) => baseInstance.delete(url, request),
  post: (
    url: string,
    data: { [key: string]: string },
    config?: AxiosRequestConfig
  ) => baseInstance.post(url, data, config)
}

export default apiRequest
