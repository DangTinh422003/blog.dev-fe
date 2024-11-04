const axiosConfigs = {
  development: {
    baseURL: 'http://localhost:3000/',
    timeout: 10000,
  },
  production: {
    baseURL: 'http://localhost:3000/',
    timeout: 10000,
  },
  test: {
    baseURL: 'http://localhost:3000/',
    timeout: 10000,
  },
};
const getAxiosConfig = (): AxiosRequestConfig => {
  const nodeEnv: string = process.env.NODE_ENV;
  return {
    ...axiosConfigs[nodeEnv as keyof typeof axiosConfigs],
    withCredentials: true,
  };
};

const axiosConfig = getAxiosConfig();

export default axiosConfig;
