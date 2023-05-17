import { AxiosClient } from '../axiosClient'
import { HttpError } from '../error/ApiErroBoundary'

export class SearchService {
  private RESOURCE = '/search'
  private apiRequest: AxiosClient

  constructor(apiRequest: AxiosClient) {
    this.apiRequest = apiRequest
  }

  async get(q: string, page = 1, limit = 10) {
    try {
      return await this.apiRequest.get(`${this.RESOURCE}`, {
        params: {
          q,
          page,
          limit
        }
      })
    } catch (error: any) {
      throw new HttpError(error.response.status)
    }
  }
}
