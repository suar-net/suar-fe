<script setup lang="ts">
import { useHttpClient } from '@/composables/useHttpClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Settings, Plus } from 'lucide-vue-next'

const mockEnvironments: any[] = []
</script>

<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm" disabled>
        <Settings class="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Environment Variables</DialogTitle>
      </DialogHeader>
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <Select defaultValue="Development">
            <SelectTrigger class="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="env in mockEnvironments" :key="env.name" :value="env.name">
                {{ env.name }}
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Plus class="h-4 w-4" />
          </Button>
        </div>
        <div class="space-y-2">
          <div class="grid grid-cols-2 gap-2 text-sm font-medium">
            <div>Variable</div>
            <div>Value</div>
          </div>
          <div
            v-for="(value, key) in mockEnvironments[0].variables"
            :key="key"
            class="grid grid-cols-2 gap-2"
          >
            <Input :value="key" readonly />
            <Input :value="value" readonly />
          </div>
          <Button variant="outline" size="sm" class="w-full bg-transparent">
            <Plus class="h-4 w-4 mr-2" />
            Add Variable
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
