<script setup lang="ts">
import { ref, computed } from 'vue'
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
import { Eye, EyeOff, Check } from 'lucide-vue-next'
import { register } from '@/services/authService'

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const emit = defineEmits(['show-login'])

const handleRegister = async () => {
  try {
    await register(formData.value.username, formData.value.email, formData.value.password)
    emit('show-login')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}

const passwordRequirements = computed(() => [
  { text: 'At least 8 characters', met: formData.value.password.length >= 8 },
  { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.value.password) },
  { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.value.password) },
  { text: 'Contains number', met: /\d/.test(formData.value.password) },
])
</script>

<template>
  <CardHeader class="space-y-1 text-center">
    <CardTitle class="text-2xl font-bold">Create your account</CardTitle>
    <CardDescription>Get started with HTTP Client and manage your API requests</CardDescription>
  </CardHeader>
  <CardContent class="space-y-4">
    <div class="space-y-2">
      <Label for="username">Username</Label>
      <Input
        id="username"
        placeholder="Enter your username"
        v-model="formData.username"
        class="h-11"
      />
    </div>

    <div class="space-y-2">
      <Label for="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        v-model="formData.email"
        class="h-11"
      />
    </div>

    <div class="space-y-2">
      <Label for="password">Password</Label>
      <div class="relative">
        <Input
          id="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Create a password"
          v-model="formData.password"
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

      <!-- Password Requirements -->
      <div v-if="formData.password" class="space-y-1 mt-2">
        <div
          v-for="(req, index) in passwordRequirements"
          :key="index"
          class="flex items-center gap-2 text-xs"
        >
          <div
            :class="[
              'w-3 h-3 rounded-full flex items-center justify-center',
              req.met ? 'bg-green-500' : 'bg-muted',
            ]"
          >
            <Check v-if="req.met" class="w-2 h-2 text-white" />
          </div>
          <span :class="[req.met ? 'text-green-600' : 'text-muted-foreground']">{{
            req.text
          }}</span>
        </div>
      </div>
    </div>

    <div class="space-y-2">
      <Label for="confirmPassword">Confirm password</Label>
      <div class="relative">
        <Input
          id="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="Confirm your password"
          v-model="formData.confirmPassword"
          class="h-11 pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          @click="showConfirmPassword = !showConfirmPassword"
        >
          <EyeOff v-if="showConfirmPassword" class="h-4 w-4 text-muted-foreground" />
          <Eye v-else class="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
      <p
        v-if="formData.confirmPassword && formData.password !== formData.confirmPassword"
        class="text-xs text-red-500"
      >
        Passwords do not match
      </p>
    </div>

    <Button
      class="w-full h-11"
      size="lg"
      :disabled="formData.password !== formData.confirmPassword"
      @click="handleRegister"
    >
      Create Account
    </Button>
  </CardContent>
  <CardFooter class="flex flex-col space-y-4">
    <div class="text-sm text-center text-muted-foreground">
      Already have an account?
      <a
        href="#"
        @click.prevent="emit('show-login')"
        class="text-primary hover:underline font-medium"
      >
        Sign in
      </a>
    </div>
  </CardFooter>
</template>
