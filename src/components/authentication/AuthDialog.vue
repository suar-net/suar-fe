<script setup lang="ts">
import { ref, watch } from 'vue'
import Login from './Login.vue'
import Register from './Register.vue'
import { Dialog, DialogScrollContent as DialogContent } from '@/components/ui/dialog'

const props = defineProps({
  open: Boolean,
  initialView: {
    type: String,
    default: 'login',
  },
})

const emit = defineEmits(['update:open'])

const showLogin = ref(props.initialView === 'login')

watch(
  () => props.initialView,
  (newView) => {
    showLogin.value = newView === 'login'
  },
)

const onOpenChange = (open: boolean) => {
  emit('update:open', open)
}
</script>

<template>
  <Dialog :open="props.open" @update:open="onOpenChange">
    <DialogContent class="max-w-md">
      <Login
        v-if="showLogin"
        @show-register="showLogin = false"
        @login-success="onOpenChange(false)"
      />
      <Register v-else @show-login="showLogin = true" />
    </DialogContent>
  </Dialog>
</template>
