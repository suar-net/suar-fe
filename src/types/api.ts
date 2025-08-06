export interface ApiRequest {
  method: string
  url: string
  headers: Record<string, string[]>
  body?: any
  timeout: number
}

export interface ApiResponse {
  status_code: number
  duration: number
  timestamp: string
  size: number
  headers: Record<string, string[]>
  body: string
}

export interface RequestError {
  message: string
  status?: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type?: string
  expires_in?: number
  user?: UserInfo
}

export interface UserInfo {
  id: number
  username: string
  email: string
  created_at?: string
  updated_at?: string
}

export interface HttpHeaders {
  [key: string]: string | string[]
}

export type RequestBody = 
  | string 
  | Record<string, any> 
  | FormData 
  | ArrayBuffer 
  | null