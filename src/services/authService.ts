import { apiService } from './api'

interface LoginResponse {
  success: boolean
  token?: string
  token_type?: string
  expires_at?: string
  mfa_session_id?: string
  message?: string
}

interface User {
  user_id: string
  username: string
  role: 'student' | 'faculty' | 'administrator'
  exp?: string
}

class AuthService {
  setToken(token: string | null) {
    localStorage.setItem('auth_token', token || '')
  }

  async login(username: string, password: string, mfaCode?: string): Promise<LoginResponse> {
    return apiService.post<LoginResponse>('/api/v1/auth/login', {
      username,
      password,
      mfa_code: mfaCode,
    })
  }

  async logout(): Promise<void> {
    return apiService.post('/api/v1/auth/logout')
  }

  async getCurrentUser(): Promise<User> {
    return apiService.get<User>('/api/v1/auth/me')
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    return apiService.post<LoginResponse>('/api/v1/auth/refresh', {
      refresh_token: refreshToken,
    })
  }
}

export const authService = new AuthService()
