<script setup lang="ts">
import { ref } from 'vue'
import { useHttpClient } from '@/composables/useHttpClient'
import { useAuth } from '@/composables/useAuth'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import AuthDialog from './authentication/AuthDialog.vue'
import EnvironmentDialog from './EnvironmentDialog.vue'
import { Folder, History, ChevronRight, ChevronDown, Globe, Plus, Trash2 } from 'lucide-vue-next'

const { isAuthenticated, logout } = useAuth()

const showAuthDialog = ref(false)
const authView = ref('login')

const openAuthDialog = (view: 'login' | 'register') => {
  authView.value = view
  showAuthDialog.value = true
}
</script>

<template>
  <div class="w-80 border-r bg-muted/30 flex-col fixed inset-y-0 left-0 z-10 lg:relative lg:flex">
    <div class="p-4 border-b">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-xl font-bold">SUAR</h1>
        <div class="flex items-center gap-2">
          <div v-if="isAuthenticated">
            <Button variant="outline" size="sm" @click="logout"> Logout </Button>
          </div>
          <div v-else class="flex items-center gap-2">
            <Button variant="outline" size="sm" @click="openAuthDialog('login')"> Login </Button>
            <Button size="sm" @click="openAuthDialog('register')"> Sign Up </Button>
          </div>
        </div>
      </div>

      <AuthDialog
        :open="showAuthDialog"
        :initial-view="authView"
        @update:open="showAuthDialog = $event"
      />

      <div class="flex items-center gap-2">
        <div class="flex-1">
          <Select disabled>
            <SelectTrigger class="w-full">
              <Globe class="h-4 w-4 mr-2" />
              <SelectValue placeholder="Env Variable (Coming Soon)"/>
            </SelectTrigger>
            <SelectContent>
              <!-- <SelectItem v-for="env in mockEnvironments" :key="env.name" :value="env.name">
                {{ env.name }}
              </SelectItem> -->
            </SelectContent>
          </Select>
        </div>
        <EnvironmentDialog />
      </div>
    </div>

    <Tabs class="flex-1" defaultValue="history">
      <TabsList class="grid w-full grid-cols-2 mt-4">
        <TabsTrigger value="collections" class="flex items-center gap-2">
          <Folder class="h-4 w-4" />
          Collections
        </TabsTrigger>
        <TabsTrigger value="history" class="flex items-center gap-2">
          <History class="h-4 w-4" />
          History
        </TabsTrigger>
      </TabsList>

      <TabsContent value="collections" class="mt-4 px-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-medium">Collections</h3>
          <Button variant="outline" size="sm">
            <Plus class="h-4 w-4" />
          </Button>
        </div>
        <div class="flex flex-col items-center justify-center h-[calc(100vh-300px)]">
          <img 
            src="/under-construction.png" 
            alt="Under Construction" 
            class="w-32 h-32 opacity-60 mb-4"
          />
          <p class="text-sm text-muted-foreground text-center">
            Collections feature is still under development!
          </p>
        </div>
        <!-- <ScrollArea class="h-[calc(100vh-200px)]">
          <div class="space-y-2">
            <div v-for="collection in mockCollections" :key="collection.id" class="space-y-1">
              <div
                class="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                @click="toggleCollection(collection.id)"
              >
                <ChevronDown v-if="expandedCollections.includes(collection.id)" class="h-4 w-4" />
                <ChevronRight v-else class="h-4 w-4" />
                <Folder class="h-4 w-4" />
                <span class="flex-1 text-sm">{{ collection.name }}</span>
              </div>
              <div v-if="expandedCollections.includes(collection.id)" class="ml-6 space-y-1">
                <div
                  v-for="request in collection.requests"
                  :key="request.id"
                  class="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                >
                  <Badge
                    variant="secondary"
                    :class="`${getMethodColor(request.method)} text-white text-xs px-2`"
                  >
                    {{ request.method }}
                  </Badge>
                  <span class="text-sm truncate">{{ request.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea> -->
      </TabsContent>

      <TabsContent value="history" class="mt-4 px-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-medium">Request History</h3>
          <Button variant="outline" size="sm">
            <Trash2 class="h-4 w-4" />
          </Button>
        </div>
        <div class="flex flex-col items-center justify-center h-[calc(100vh-300px)]">
          <img 
            src="/under-construction.png" 
            alt="Under Construction" 
            class="w-32 h-32 opacity-60 mb-4"
          />
          <p class="text-sm text-muted-foreground text-center">
            History feature is still under development!
          </p>
        </div>
        <!-- <ScrollArea class="h-[calc(100vh-200px)]">
          <div class="space-y-2">
            <div
              v-for="request in mockHistory"
              :key="request.id"
              class="p-3 rounded-md border hover:bg-muted cursor-pointer"
            >
              <div class="flex items-center gap-2 mb-1">
                <Badge
                  variant="secondary"
                  :class="`${getMethodColor(request.method)} text-white text-xs px-2`"
                >
                  {{ request.method }}
                </Badge>
                <div :class="`w-2 h-2 rounded-full ${getStatusColor(request.status)}`" />
                <span class="text-xs text-muted-foreground">{{ request.status }}</span>
              </div>
              <div class="text-sm truncate mb-1">{{ request.url }}</div>
              <div class="text-xs text-muted-foreground">{{ request.timestamp }}</div>
            </div>
          </div>
        </ScrollArea> -->
      </TabsContent>
    </Tabs>
  </div>
</template>
