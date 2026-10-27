<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/modules/notification'

const store = useNotificationStore()
const { visible, text, color, timeout } = storeToRefs(store)
</script>

<template>
  <v-snackbar v-model="visible" :color="color" :timeout="timeout" location="top">
    {{ text }}
    <template #actions>
      <v-btn variant="text" @click="visible = false">Закрыть</v-btn>
    </template>
  </v-snackbar>
</template>