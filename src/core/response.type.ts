export interface Response<T> {
  data: T;
  message: string;
  status: number;
}
