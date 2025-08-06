import { ref, computed } from 'vue';

const token = ref<string | null>(localStorage.getItem('authToken'));

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value);

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem('authToken', newToken);
  }

  function logout() {
    token.value = null;
    localStorage.removeItem('authToken');
  }

  return {
    token,
    isAuthenticated,
    setToken,
    logout,
  };
}