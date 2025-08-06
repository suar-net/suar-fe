import axios from 'axios'
import { useAuth } from '@/composables/useAuth'

const API_URL = '/api/v1/auth'

export async function register(username: any, email: any, password: any) {
    return await axios.post(`${API_URL}/register`, { username, email, password })
}

export async function login(email: any, password: any) {
    const { setToken } = useAuth()
    const response = await axios.post(`${API_URL}/login`, { email, password })

    if (response.data.access_token) {
        setToken(response.data.access_token)
    }

    return response.data
}
