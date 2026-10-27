<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app class="applicatin">
      <RouterView />
  </v-app>
</template>

<style scoped>
  .applicatin{
    min-height: inherit;
  }
</style>
