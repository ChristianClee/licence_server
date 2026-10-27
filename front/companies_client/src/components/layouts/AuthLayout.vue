<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthorizationStore } from '@/stores/modules/authorization'
  import GlobalSnackbar from '@/components/ui/GlobalSnackbar.vue'

  const store = useAuthorizationStore()
// store.setRole()


</script>
<template>
    <header>
      <div v-if="!store.permission">
        Не авторизованный пользователь
      </div>
      <div v-else>
        {{ store.permission }}
      </div>
    </header>
    <main>
      <div class="main-content">
        <RouterView/>
        <GlobalSnackbar/>
      </div>
    </main>
    <footer>make scroll additional information here</footer>
</template>

<style scoped lang="scss">
  header{
    height: var(--header-height);
    display: flex;
    justify-content: center;
  }
  main{
    height: calc(100vh - var(--header-height) - var(--header-height));
    display: flex;
    align-items: center;
    justify-content: center;
    & .main-content{
      flex-grow: 1;
    }
  }
  footer{
    height: var(--header-height);
      display: flex;
    justify-content: center;
  }
  
</style>
