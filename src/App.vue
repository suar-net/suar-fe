<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import RequestPanel from './components/RequestPanel.vue'
import ResponsePanel from './components/ResponsePanel.vue'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-vue-next'

const isSidebarOpen = ref(true)
</script>

<template>
  <div class="flex h-screen bg-background">
    <Sidebar :class="{ hidden: !isSidebarOpen, 'lg:flex': true }" />
    <div class="flex-1 flex flex-col">
      <div class="lg:hidden p-2 border-b">
        <Button variant="outline" @click="isSidebarOpen = !isSidebarOpen">
          <Menu class="h-6 w-6" />
        </Button>
      </div>
      <RequestPanel />
      <ResponsePanel />
    </div>
  </div>
</template>