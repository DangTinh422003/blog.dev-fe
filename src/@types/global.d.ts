// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type AxiosRequestConfig = import('axios').AxiosRequestConfig;

interface IAuthToken {
  access_token?: string;
  refresh_token?: string;
  access_token_expires_in?: number;
  access_token_expires_at?: number;
}
