<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './modules/auth/stores/auth.store';
import { AuthStatusEnum } from './modules/auth/interfaces/auth.status.enum';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
authStore.$subscribe(
  (_, state) => {
    if (state.authStatus == AuthStatusEnum.Checking) {
      authStore.checkAuthStatus();
      return;
    }

    if (route.path == '/' && state.authStatus == AuthStatusEnum.Authenticated) {
      router.replace({ name: 'dashboard' });
      return;
    }

  },
  {
    immediate: true
  }
);
</script>

<template>
  <RouterView />
</template>
<style scoped></style>
