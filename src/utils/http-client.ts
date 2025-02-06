import axios, { AxiosInstance, AxiosResponse } from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 기존 AxiosInstance를 확장하여 새로운 타입을 정의
interface CustomAxiosInstance extends AxiosInstance {
  get<T = any>(url: string, config?: any): Promise<T>;
  post<T = any>(url: string, data?: any, config?: any): Promise<T>;
  put<T = any>(url: string, data?: any, config?: any): Promise<T>;
  delete<T = any>(url: string, config?: any): Promise<T>;
}

// 인터셉터 적용
const httpClientWithInterceptor = httpClient as CustomAxiosInstance;
httpClientWithInterceptor.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => response.data,
);

export { httpClientWithInterceptor as httpClient };
