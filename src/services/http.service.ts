import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import _omitBy from 'lodash/omitBy'

import axiosConfig from '@/configs/api.config'
import HttpStatusCode from '@/constants/httpStatusCode'
import StoreKeys from '@/constants/storekeys'

import localStorageService from './localStorage.service'

/** @class */
export default class HttpService {
  private readonly instance: AxiosInstance

  constructor(config = axiosConfig) {
    const axiosConfigs = config

    const instance = axios.create({ ...axiosConfigs })
    Object.assign(instance, this.setupInterceptorsTo(instance))
    this.instance = instance
  }

  private onRefreshToken() {
    const { refresh_token }: IAuthToken = localStorageService.get(
      StoreKeys.ACCESS_TOKEN,
      '',
    )
    if (refresh_token) {
      // TODO: handle refresh token
      return ''
    }
  }

  private readonly onRequest = (config: InternalAxiosRequestConfig) => {
    return config
  }

  private readonly onRequestError = (
    error: AxiosError,
  ): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`)
    return Promise.reject(error)
  }

  private readonly onResponse = (response: AxiosResponse) => {
    return response.data
  }

  private readonly onResponseError = (
    error: AxiosError,
  ): Promise<AxiosError> => {
    const statusCode = error?.response?.status
    switch (statusCode) {
      case HttpStatusCode.UNAUTHORIZED: {
        if (
          typeof window !== 'undefined' &&
          !window.location.pathname.startsWith('/auth')
        ) {
          window.location.replace('/auth/sign-in')
        }
        break
      }
    }
    return Promise.reject(error)
  }

  private setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError)
    axiosInstance.interceptors.response.use(
      this.onResponse,
      this.onResponseError,
    )
    return axiosInstance
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.get<T>(`${url}`, config)) as T
  }

  public async post<T>(url: string, data?: T, config?: AxiosRequestConfig) {
    return await this.instance.post<T>(url, data, config)
  }

  public async put<T>(url: string, data?: T, config?: AxiosRequestConfig) {
    return await this.instance.put<T>(url, data, config)
  }

  public async patch<T>(url: string, data: T, config?: AxiosRequestConfig) {
    return await this.instance.patch<T>(url, data, config)
  }

  public async delete(url: string, config?: AxiosRequestConfig) {
    return await this.instance.delete(url, config)
  }

  public setHttpConfigs(config?: Partial<AxiosRequestConfig>) {
    if (config?.baseURL) {
      this.instance.defaults.baseURL = config.baseURL
    }

    this.instance.defaults = {
      ...this.instance.defaults,
      ..._omitBy(config, 'BaseURL'),
    }
  }
}
