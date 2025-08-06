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
