'use client';

import HttpService from '@/services/http.service';

import { type Example } from './example.types';

class ExampleApiService extends HttpService {
  constructor() {
    super({
      baseURL: 'https://64c3cfbd67cfdca3b66051f9.mockapi.io/',
    });
  }

  getExamples() {
    return this.get<Example[]>('/product');
  }
  getExample(id: number) {
    return this.get<Example>(`/product/${id}`);
  }
  updateExample(example: Example) {
    return this.put<Example>(`/product/${example.id}`, example);
  }
}

const exampleApi = new ExampleApiService();

export default exampleApi;
