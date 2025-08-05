import { ref } from 'vue'

export function useHttpClient() {
  const selectedMethod = ref('GET')
  const url = ref('')
  const selectedEnvironment = ref('None')
  const expandedCollections = ref<string[]>([])
  const activeTab = ref('collections')

  const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']

  const mockCollections = ref([
    {
      id: '1',
      name: 'User API',
      requests: [
        { id: '1', name: 'Get Users', method: 'GET', url: '/api/users' },
        { id: '2', name: 'Create User', method: 'POST', url: '/api/users' },
        { id: '3', name: 'Update User', method: 'PUT', url: '/api/users/:id' },
      ],
    },
    {
      id: '2',
      name: 'Auth API',
      requests: [
        { id: '4', name: 'Login', method: 'POST', url: '/auth/login' },
        { id: '5', name: 'Refresh Token', method: 'POST', url: '/auth/refresh' },
      ],
    },
  ])

  const mockHistory = ref([
    {
      id: '1',
      method: 'GET',
      url: 'https://api.example.com/users',
      status: 200,
      timestamp: '2024-01-15 10:30:00',
    },
    {
      id: '2',
      method: 'POST',
      url: 'https://api.example.com/users',
      status: 201,
      timestamp: '2024-01-15 10:25:00',
    },
    {
      id: '3',
      method: 'GET',
      url: 'https://api.example.com/posts',
      status: 404,
      timestamp: '2024-01-15 10:20:00',
    },
    {
      id: '4',
      method: 'DELETE',
      url: 'https://api.example.com/users/123',
      status: 200,
      timestamp: '2024-01-15 10:15:00',
    },
  ])

  const mockEnvironments = ref([
    {
      name: 'Development',
      variables: { API_URL: 'http://localhost:3000', API_KEY: 'dev-key-123' },
    },
    {
      name: 'Staging',
      variables: { API_URL: 'https://staging.api.com', API_KEY: 'staging-key-456' },
    },
    { name: 'Production', variables: { API_URL: 'https://api.com', API_KEY: 'prod-key-789' } },
  ])

  const toggleCollection = (collectionId: string) => {
    const index = expandedCollections.value.indexOf(collectionId)
    if (index > -1) {
      expandedCollections.value.splice(index, 1)
    } else {
      expandedCollections.value.push(collectionId)
    }
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-green-500'
    if (status >= 300 && status < 400) return 'bg-yellow-500'
    if (status >= 400 && status < 500) return 'bg-orange-500'
    if (status >= 500) return 'bg-red-500'
    return 'bg-gray-500'
  }

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

  return {
    selectedMethod,
    url,
    selectedEnvironment,
    expandedCollections,
    activeTab,
    httpMethods,
    mockCollections,
    mockHistory,
    mockEnvironments,
    toggleCollection,
    getStatusColor,
    getMethodColor,
  }
}
