<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-vue-next'
import { login } from '@/services/authService'

const showPassword = ref(false)
const email = ref('')
const password = ref('')

const emit = defineEmits(['show-register', 'login-success'])

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
    emit('login-success')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <CardHeader class="space-y-1 text-center">
    <CardTitle class="text-2xl font-bold">Welcome back</CardTitle>
    <CardDescription>Sign in to your account to continue using Suar</CardDescription>
  </CardHeader>
  <CardContent class="space-y-4">
    <div class="space-y-2">
      <Label for="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" v-model="email" class="h-11" />
    </div>
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <Label for="password">Password</Label>
        <a href="#" class="text-sm text-muted-foreground hover:text-primary"> Forgot password? </a>
      </div>
      <div class="relative">
        <Input
          id="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter your password"
          v-model="password"
          class="h-11 pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          @click="showPassword = !showPassword"
        >
          <EyeOff v-if="showPassword" class="h-4 w-4 text-muted-foreground" />
          <Eye v-else class="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
    <Button class="w-full h-11" size="lg" @click="handleLogin"> Sign In </Button>
  </CardContent>
  <CardFooter class="flex flex-col space-y-4">
    <div class="text-sm text-center text-muted-foreground">
      Don't have an account?
      <a
        href="#"
        @click.prevent="emit('show-register')"
        class="text-primary hover:underline font-medium"
      >
        Sign up
      </a>
    </div>
  </CardFooter>
</template>
