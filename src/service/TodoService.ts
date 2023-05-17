import { AxiosClient } from '../axiosClient'
import { HttpError } from '../error/ApiErroBoundary'

export class TodoService {
  private RESOURCE = '/todos'
  private apiRequest: AxiosClient

  constructor(apiRequest: AxiosClient) {
    this.apiRequest = apiRequest
  }

  async get() {
    try {
      return await this.apiRequest.get(`${this.RESOURCE}`)
    } catch (error: any) {
      throw new HttpError(error.response.status)
    }
  }

  async create(todo: { title: string }) {
    try {
      return await this.apiRequest.post(`${this.RESOURCE}`, todo)
    } catch (error: any) {
      throw new HttpError(error.response.status)
    }
  }

  async delete(id: string) {
    try {
      return await this.apiRequest.delete(`${this.RESOURCE}/${id}`)
    } catch (error: any) {
      throw new HttpError(error.response.status)
    }
  }
}
