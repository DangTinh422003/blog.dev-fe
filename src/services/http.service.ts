import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import _omitBy from 'lodash/omitBy';

import axiosConfig from '@/configs/api.config';

/** @class */
export default class HttpService {
  private readonly instance: AxiosInstance;

  constructor(config = axiosConfig) {
    const axiosConfigs = config;

    const instance = axios.create({ ...axiosConfigs });
    Object.assign(instance, this.setupInterceptorsTo(instance));
    this.instance = instance;
  }

  private readonly onRequest = (config: InternalAxiosRequestConfig) => {
    return config;
  };

  private readonly onRequestError = (
    error: AxiosError,
  ): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };

  private readonly onResponse = (response: AxiosResponse) => {
    return response.data;
  };

  private readonly onResponseError = (
    error: AxiosError,
  ): Promise<AxiosError> => {
    return Promise.reject(error);
  };

  private setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);
    axiosInstance.interceptors.response.use(
      this.onResponse,
      this.onResponseError,
    );
    return axiosInstance;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.get<T>(`${url}`, config)) as T;
  }

  public async post<T>(url: string, data?: T, config?: AxiosRequestConfig) {
    return await this.instance.post<T>(url, data, config);
  }

  public async put<T>(url: string, data?: T, config?: AxiosRequestConfig) {
    return await this.instance.put<T>(url, data, config);
  }

  public async patch<T>(url: string, data: T, config?: AxiosRequestConfig) {
    return await this.instance.patch<T>(url, data, config);
  }

  public async delete(url: string, config?: AxiosRequestConfig) {
    return await this.instance.delete(url, config);
  }

  public setHttpConfigs(config?: Partial<AxiosRequestConfig>) {
    if (config?.baseURL) {
      this.instance.defaults.baseURL = config.baseURL;
    }

    this.instance.defaults = {
      ...this.instance.defaults,
      ..._omitBy(config, 'BaseURL'),
      timeout: 10000,
      withCredentials: true,
    };
  }
}

const axiosInstance = new HttpService();
export { axiosInstance };
