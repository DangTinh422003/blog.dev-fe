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
}

const authApiService = new AuthApiService();

export default authApiService;
