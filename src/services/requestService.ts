import apiClient from './apiClient'
import type { ApiResponse, HttpHeaders, RequestBody } from '@/types/api'

const API_URL = '/api/v1/request'

export async function makeRequest(
  method: string,
  url: string,
  headers: HttpHeaders,
  body: RequestBody,
  timeout: number,
): Promise<ApiResponse> {
  const response = await apiClient.post<ApiResponse>(API_URL, {
    method,
    url,
    headers,
    body,
    timeout,
  })
  return response.data
}
