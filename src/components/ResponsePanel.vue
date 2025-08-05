<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Download } from 'lucide-vue-next'
</script>

<template>
  <div class="flex-1 p-6">
    <Card class="h-full">
      <CardHeader class="pb-3">
        <div class="flex items-center justify-between">
          <CardTitle class="text-lg">Response</CardTitle>
          <div class="flex items-center gap-2">
            <Badge variant="outline" class="bg-green-50 text-green-700 border-green-200">
              200 OK
            </Badge>
            <Badge variant="outline">245ms</Badge>
            <Badge variant="outline">1.2KB</Badge>
            <Button variant="outline" size="sm">
              <Copy class="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent class="pt-0">
        <Tabs defaultValue="body" class="h-full">
          <TabsList>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="cookies">Cookies</TabsTrigger>
          </TabsList>

          <TabsContent value="body" class="mt-4 h-[calc(100%-60px)]">
            <ScrollArea class="h-full">
              <pre class="text-sm bg-muted p-4 rounded-md overflow-auto">
                {`{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "name": "Jane Smith", 
      "email": "jane@example.com",
      "created_at": "2024-01-14T15:20:00Z"
    }
  ],
  "total": 2,
  "page": 1,
  "per_page": 10
}`}
              </pre>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="headers" class="mt-4">
            <div class="space-y-2">
              <div
                v-for="(header, i) in [
                  { key: 'Content-Type', value: 'application/json' },
                  { key: 'Content-Length', value: '1247' },
                  { key: 'Server', value: 'nginx/1.18.0' },
                  { key: 'Date', value: 'Mon, 15 Jan 2024 10:30:00 GMT' },
                ]"
                :key="i"
                class="flex items-center justify-between p-2 bg-muted rounded"
              >
                <span class="font-medium">{{ header.key }}:</span>
                <span class="text-muted-foreground">{{ header.value }}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cookies" class="mt-4">
            <div class="text-center text-muted-foreground py-8">No cookies in response</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>
