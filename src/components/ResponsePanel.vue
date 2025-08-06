<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Download } from 'lucide-vue-next'

import { computed } from 'vue'
import { useHttpClient } from '@/composables/useHttpClient'

const { response, error, isLoading, formatResponseBody, getStatusBadgeVariant } = useHttpClient()

const formattedBody = computed(() => {
  if (!response.value?.body) return ''
  return formatResponseBody(response.value.body)
})

const responseHeaders = computed(() => {
  if (!response.value?.headers) return []
  return Object.entries(response.value.headers).map(([key, values]) => ({
    key,
    value: Array.isArray(values) ? values.join(', ') : values,
  }))
})

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function getStatusText(statusCode: number): string {
  const statusTexts: Record<number, string> = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    500: 'Internal Server Error',
  }
  return statusTexts[statusCode] || 'Unknown'
}

function copyResponse() {
  if (response.value?.body) {
    navigator.clipboard.writeText(formattedBody.value)
  }
}

function downloadResponse() {
  if (response.value?.body) {
    const blob = new Blob([formattedBody.value], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'response.json'
    a.click()
    URL.revokeObjectURL(url)
  }
}
</script>

<template>
  <div class="flex-1 p-6">
    <Card class="h-full">
      <CardHeader class="pb-3">
        <div class="flex items-center justify-between">
          <CardTitle class="text-lg">Response</CardTitle>
          <div class="flex items-center gap-2">
            <div v-if="isLoading" class="text-sm text-muted-foreground">Sending request...</div>
            <template v-else-if="response">
              <Badge
                variant="outline"
                :class="`${getStatusBadgeVariant(response.status_code)} text-white`"
              >
                {{ response.status_code }} {{ getStatusText(response.status_code) }}
              </Badge>
              <Badge variant="outline">{{ response.duration }}ms</Badge>
              <Badge variant="outline">{{ formatFileSize(response.size) }}</Badge>
              <Button variant="outline" size="sm" @click="copyResponse">
                <Copy class="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" @click="downloadResponse">
                <Download class="h-4 w-4" />
              </Button>
            </template>
            <div v-else-if="error" class="text-sm text-red-600">Error: {{ error.message }}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent class="pt-0">
        <div v-if="isLoading" class="flex items-center justify-center h-64">
          <div class="text-muted-foreground">Loading...</div>
        </div>

        <div v-else-if="error" class="flex items-center justify-center h-64">
          <div class="text-center">
            <div class="text-red-600 font-medium">Request Failed</div>
            <div class="text-sm text-muted-foreground mt-2">{{ error.message }}</div>
          </div>
        </div>

        <Tabs v-else-if="response" defaultValue="body" class="h-full">
          <TabsList>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
          </TabsList>

          <TabsContent value="body" class="mt-4 h-[calc(100%-60px)]">
            <ScrollArea class="h-full">
              <pre class="text-sm bg-muted p-4 rounded-md overflow-auto">{{ formattedBody }}</pre>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="headers" class="mt-4">
            <div class="space-y-2">
              <div
                v-for="header in responseHeaders"
                :key="header.key"
                class="flex items-center justify-between p-2 bg-muted rounded"
              >
                <span class="font-medium">{{ header.key }}:</span>
                <span class="text-muted-foreground">{{ header.value }}</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div v-else class="flex items-center justify-center h-64">
          <div class="text-center text-muted-foreground">
            <div>No response yet</div>
            <div class="text-sm mt-2">Send a request to see the response here</div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
