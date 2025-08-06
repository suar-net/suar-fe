<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Send, Plus, Trash2 } from 'lucide-vue-next'

import { useHttpClient } from '@/composables/useHttpClient'

const {
  selectedMethod,
  url,
  httpMethods,
  getMethodColor,
  isLoading,
  requestParams,
  requestHeaders,
  requestBody,
  authType,
  bodyType,
  sendRequest,
  addParam,
  removeParam,
  addHeader,
  removeHeader,
} = useHttpClient()
</script>

<template>
  <div class="p-6 border-b">
    <div class="space-y-4">
      <!-- URL Bar -->
      <div class="flex gap-2">
        <Select v-model="selectedMethod">
          <SelectTrigger class="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="method in httpMethods" :key="method" :value="method">
              <Badge
                variant="secondary"
                :class="`${getMethodColor(method)} text-white text-xs px-2 mr-2`"
              >
                {{ method }}
              </Badge>
            </SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Enter request URL" v-model="url" class="flex-1" />
        <Button class="px-6" @click="sendRequest" :disabled="isLoading">
          <Send class="h-4 w-4 mr-2" />
          {{ isLoading ? 'Sending...' : 'Send' }}
        </Button>
      </div>

      <!-- Request Configuration -->
      <Tabs defaultValue="params" class="w-full">
        <TabsList>
          <TabsTrigger value="params">Params</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="body">Body</TabsTrigger>
          <!-- <TabsTrigger value="auth">Auth</TabsTrigger> -->
        </TabsList>

        <TabsContent value="params" class="mt-4">
          <div class="space-y-2">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm font-medium">
              <div>Key</div>
              <div>Value</div>
              <div>Actions</div>
            </div>
            <div v-for="param in requestParams" :key="param.id" class="grid grid-cols-3 gap-2">
              <Input v-model="param.key" placeholder="Parameter name" />
              <Input v-model="param.value" placeholder="Parameter value" />
              <Button variant="outline" size="sm" @click="removeParam(param.id)">
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" @click="addParam">
              <Plus class="h-4 w-4 mr-2" />
              Add Parameter
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="headers" class="mt-4">
          <div class="space-y-2">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm font-medium">
              <div>Key</div>
              <div>Value</div>
              <div>Actions</div>
            </div>
            <div v-for="header in requestHeaders" :key="header.id" class="grid grid-cols-3 gap-2">
              <Input v-model="header.key" placeholder="Header name" />
              <Input v-model="header.value" placeholder="Header value" />
              <Button variant="outline" size="sm" @click="removeHeader(header.id)">
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" @click="addHeader">
              <Plus class="h-4 w-4 mr-2" />
              Add Header
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="body" class="mt-4">
          <div class="space-y-4">
            <Select v-model="bodyType">
              <SelectTrigger class="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="form">Form Data</SelectItem>
                <SelectItem value="raw">Raw</SelectItem>
                <SelectItem value="binary">Binary</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              v-model="requestBody"
              placeholder="Enter request body"
              class="min-h-[200px] font-mono"
            />
          </div>
        </TabsContent>

        <!-- <TabsContent value="auth" class="mt-4">
          <div class="space-y-4">
            <Select defaultValue="none">
              <SelectTrigger class="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Auth</SelectItem>
                <SelectItem value="bearer">Bearer Token</SelectItem>
                <SelectItem value="basic">Basic Auth</SelectItem>
                <SelectItem value="api-key">API Key</SelectItem>
              </SelectContent>
            </Select>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <Label for="username">Username</Label>
                <Input id="username" placeholder="Enter username" />
              </div>
              <div>
                <Label for="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" />
              </div>
            </div>
          </div>
        </TabsContent> -->
      </Tabs>
    </div>
  </div>
</template>
