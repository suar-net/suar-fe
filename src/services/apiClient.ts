import axios from 'axios'
import { useAuth } from '@/composables/useAuth'

const apiClient = axios.create({
  baseURL: '/api/v1',
})

apiClient.interceptors.request.use(
  (config) => {
    const { token } = useAuth()
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default apiClient
