import apiClient from './apiClient'

const API_URL = '/api/v1/request'

export async function makeRequest(
  method: string,
  url: string,
  headers: any,
  body: any,
  timeout: number,
) {
  const response = await apiClient.post(`${API_URL}`, {
    method,
    url,
    headers,
    body,
    timeout,
  })
  return response.data
}
