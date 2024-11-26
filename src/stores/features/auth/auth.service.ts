'use client';

import HttpService from '@/services/http.service';
import { type AuthState } from '@/stores/features/auth/authSlice';

class AuthApiService extends HttpService {
  async login(email: string, password: string) {
    const data = await this.post<AuthState['user']>('/access/sign-in', {
      email,
      password,
    });

    return data;
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

  activeUser(email: string, username: string) {
    return this.post<AuthState['user']>('/user/active', { email, username });
  }

  test<R>() {
    return this.get<R>('/test');
  }
}

const authApiService = new AuthApiService();
export default authApiService;
