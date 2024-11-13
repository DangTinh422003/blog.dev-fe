import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import _omitBy from 'lodash/omitBy';

import axiosConfig from '@/configs/api.config';
import localStorageService from '@/services/localStorage.service';
import authApiService from '@/stores/features/auth/auth.service';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/** @class */
export default class HttpService {
  private readonly instance: AxiosInstance;

  constructor(config = axiosConfig) {
    const instance = axios.create({ ...config });
    Object.assign(instance, this.setupInterceptorsTo(instance));
    this.instance = instance;
    this.setHttpConfigs(config);
  }

  private readonly onRequest = (config: InternalAxiosRequestConfig) => {
    const newConfig = { ...config };
    newConfig.headers['Cache-Control'] = 'no-store';
    newConfig.headers['Pragma'] = 'no-cache';
    newConfig.params = { ...newConfig.params, _: new Date().getTime() };
    return newConfig;
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

  private readonly onResponseError = async (
    error: AxiosError,
  ): Promise<AxiosError> => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config!;
    if (error.response?.status === 410 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        await this.instance.put('/access/refresh-token');
        return this.instance({ ...originalRequest });
      } catch (_error) {
        await authApiService.logout();
        localStorageService.clear();
        location.href = '/auth/login';
        return Promise.reject(new Error(String(_error)));
      }
    }

    if (error.response?.status === 401) {
      // handle log out
    }

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

  public async post<T, R>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return (await this.instance.post<R>(url, data, config)) as R;
  }

  public async put<T>(url: string, data?: T, config?: AxiosRequestConfig) {
    return await this.instance.put<T>(url, data, config);
  }

  public async patch<T, R>(url: string, data: T, config?: AxiosRequestConfig) {
    return await this.instance.patch<R>(url, data, config);
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
    };
  }
}
