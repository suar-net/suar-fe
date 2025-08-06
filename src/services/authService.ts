import apiClient from './apiClient'
import { useAuth } from '@/composables/useAuth'
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/api'

const API_URL = '/api/v1/auth'

export async function register(
  username: string, 
  email: string, 
  password: string
): Promise<AuthResponse> {
  const requestData: RegisterRequest = { username, email, password }
  const response = await apiClient.post<AuthResponse>(`${API_URL}/register`, requestData)
  return response.data
}

export async function login(
  email: string, 
  password: string
): Promise<AuthResponse> {
  const { setToken } = useAuth()
  const requestData: LoginRequest = { email, password }
  const response = await apiClient.post<AuthResponse>(`${API_URL}/login`, requestData)

  if (response.data.access_token) {
    setToken(response.data.access_token)
  }

  return response.data
}