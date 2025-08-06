import { ref, reactive } from 'vue'
import { makeRequest } from '@/services/requestService'
import type { ApiResponse, RequestError } from '@/types/api'

const selectedMethod = ref('GET')
const url = ref('')
const isLoading = ref(false)
const response = ref<ApiResponse | null>(null)
const error = ref<RequestError | null>(null)
const requestParams = ref<Array<{ id: string; key: string; value: string }>>([])
const requestHeaders = ref<Array<{ id: string; key: string; value: string }>>([])
const requestBody = ref('')
const authType = ref('none')
const bodyType = ref('json')

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']

const getMethodColor = (method: string) => {
  switch (method) {
    case 'GET':
      return 'bg-blue-500'
    case 'POST':
      return 'bg-green-500'
    case 'PUT':
      return 'bg-orange-500'
    case 'DELETE':
      return 'bg-red-500'
    case 'PATCH':
      return 'bg-purple-500'
    default:
      return 'bg-gray-500'
  }
}

async function sendRequest() {
  if (!url.value.trim()) {
    error.value = { message: 'URL is required' }
    return
  }

  isLoading.value = true
  error.value = null
  response.value = null

  try {
    // Convert headers to the expected format
    const headers: Record<string, string[]> = {}
    requestHeaders.value.forEach(({ key, value }) => {
      if (key.trim() && value.trim()) {
        headers[key] = [value]
      }
    })

    // Parse body based on type
    let body: any = null
    if (['POST', 'PUT', 'PATCH'].includes(selectedMethod.value) && requestBody.value.trim()) {
      if (bodyType.value === 'json') {
        try {
          body = JSON.parse(requestBody.value)
        } catch {
          throw new Error('Invalid JSON in request body')
        }
      } else {
        body = requestBody.value
      }
    }

    // Convert params to query string
    let fullUrl = url.value
    const queryParams = new URLSearchParams()
    requestParams.value.forEach(({ key, value }) => {
      if (key.trim() && value.trim()) {
        queryParams.append(key, value)
      }
    })
    if (queryParams.toString()) {
      fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryParams.toString()
    }

    const result = await makeRequest(
      selectedMethod.value,
      fullUrl,
      headers,
      body,
      10000,
    )

    response.value = result
  } catch (err: any) {
    error.value = {
      message: err.response?.data?.message || err.message || 'Request failed',
      status: err.response?.status,
    }
  } finally {
    isLoading.value = false
  }
}

function addParam() {
  requestParams.value.push({
    id: `param_${Date.now()}`,
    key: '',
    value: '',
  })
}

function removeParam(id: string) {
  const index = requestParams.value.findIndex((p) => p.id === id)
  if (index > -1) {
    requestParams.value.splice(index, 1)
  }
}

function addHeader() {
  requestHeaders.value.push({
    id: `header_${Date.now()}`,
    key: '',
    value: '',
  })
}

function removeHeader(id: string) {
  const index = requestHeaders.value.findIndex((h) => h.id === id)
  if (index > -1) {
    requestHeaders.value.splice(index, 1)
  }
}

function formatResponseBody(body: string): string {
  if (!body) return ''

  try {
    // Try to decode as base64 first
    const decodedBody = atob(body)

    // Try to parse the decoded content as JSON
    try {
      const jsonData = JSON.parse(decodedBody)
      return JSON.stringify(jsonData, null, 2)
    } catch {
      // If it's not JSON, return the decoded string
      return decodedBody
    }
  } catch {
    // If base64 decoding fails, try to parse as direct JSON
    try {
      return JSON.stringify(JSON.parse(body), null, 2)
    } catch {
      // If all parsing fails, return the original body
      return body
    }
  }
}

function getStatusBadgeVariant(statusCode: number) {
  if (statusCode >= 200 && statusCode < 300) return 'bg-green-500'
  if (statusCode >= 300 && statusCode < 400) return 'bg-yellow-500'
  if (statusCode >= 400 && statusCode < 500) return 'bg-orange-500'
  return 'bg-red-500'
}

export function useHttpClient() {
  return {
    httpMethods,
    selectedMethod,
    url,
    isLoading,
    response,
    error,
    requestParams,
    requestHeaders,
    requestBody,
    authType,
    bodyType,

    getMethodColor,
    sendRequest,
    addParam,
    removeParam,
    addHeader,
    removeHeader,
    formatResponseBody,
    getStatusBadgeVariant,
  }
}
