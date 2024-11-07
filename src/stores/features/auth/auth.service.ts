'use client';

import HttpService from '@/services/http.service';

class AuthApiService extends HttpService {
  login<T, R>(data: T) {
    return this.post<T, R>('/access/sign-in', data);
  }

  register<T>(data: T) {
    return this.post('/access/sign-up', data);
  }

  logout() {
    return this.delete('/access/sign-out');
  }

  refreshToken() {
    return this.put('/access/refresh-token');
  }

  activeUser<T>(email: string, data: T) {
    return this.patch('/user/active', {
      email,
      newData: data,
    });
  }

  test() {
    return this.get('/test');
  }
}

const authApiService = new AuthApiService();
export default authApiService;
