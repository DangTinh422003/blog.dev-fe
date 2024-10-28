import HttpService from './http.service'

class BaseApiService {
  protected httpClient: HttpService

  constructor() {
    this.httpClient = new HttpService()
  }
}

export default BaseApiService
