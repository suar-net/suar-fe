<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, ArrowLeft } from "lucide-vue-next"

const showPassword = ref(false)
const email = ref("")
const password = ref("")
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
    <div class="w-full max-w-md space-y-6">
      <!-- Back to App Button -->
      <div class="flex items-center">
        <Button variant="ghost" size="sm" as-child>
          <a href="/" class="flex items-center gap-2">
            <ArrowLeft class="h-4 w-4" />
            Back to HTTP Client
          </a>
        </Button>
      </div>

      <Card class="border-0 shadow-lg">
        <CardHeader class="space-y-1 text-center">
          <CardTitle class="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue using HTTP Client</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              v-model="email"
              class="h-11"
            />
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label for="password">Password</Label>
              <a href="/forgot-password" class="text-sm text-muted-foreground hover:text-primary">
                Forgot password?
              </a>
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
          <Button class="w-full h-11" size="lg">
            Sign In
          </Button>
        </CardContent>
        <CardFooter class="flex flex-col space-y-4">
          <div class="text-sm text-center text-muted-foreground">
            Don't have an account?
            <a href="/register" class="text-primary hover:underline font-medium"> Sign up </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>