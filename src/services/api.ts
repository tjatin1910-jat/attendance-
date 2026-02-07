import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

class ApiService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  get<T>(url: string, params?: any): Promise<T> {
    return this.client.get(url, { params }).then((res) => res.data)
  }

  post<T>(url: string, data?: any): Promise<T> {
    return this.client.post(url, data).then((res) => res.data)
  }

  put<T>(url: string, data?: any): Promise<T> {
    return this.client.put(url, data).then((res) => res.data)
  }

  delete<T>(url: string): Promise<T> {
    return this.client.delete(url).then((res) => res.data)
  }
}

export const apiService = new ApiService()
