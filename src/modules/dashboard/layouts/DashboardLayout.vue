<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <div class="flex justify-center items-center my-10">
        <div class="rounded-full bg-indigo-200 p-8 w-2/3 shadow-lg">
          <img src="@/assets/icon.svg" alt="ICON" class="w-full">
        </div>
      </div>
      <div>
        <v-list>
          <v-list-subheader>Casos de uso</v-list-subheader>

          <v-list-item v-for="(item, i) in itemsCasosUso" :key="i" :value="item" color="primary" rounded="xl">
            <RouterLink :to="{ name: item.to }">
              <template v-slot:prepend>
                <v-icon>{{ item.icon }}</v-icon>
              </template>

              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </RouterLink>
          </v-list-item>
        </v-list>
      </div>
      <div class="my-5">
        <v-list>
          <v-list-subheader>Geografia</v-list-subheader>

          <v-list-item v-for="(item, i) in itemsGeografia" :key="i" :value="item" color="primary" rounded="xl">
            <RouterLink :to="{ name: item.to }">
              <template v-slot:prepend>
                <v-icon>{{ item.icon }}</v-icon>
              </template>

              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </RouterLink>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar color="primary">
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-app-bar-title>Sistema de Recursos Humanos</v-app-bar-title>

      <v-btn icon title="Cerrar Sesion" @click="setLogout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div class="p-5">
        <RouterView />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { ref } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'

const drawer = ref(null);
const authStore = useAuthStore();
const router = useRouter();

const itemsGeografia = [
  { text: 'Paises', icon: 'mdi-earth', to: 'paises' },
  { text: 'Departamentos', icon: 'mdi-flag', to: 'departamentos' },
  { text: 'Municipios', icon: 'mdi-city', to: 'municipios' },
]

const itemsCasosUso = [
  { text: 'Empresas', icon: 'mdi-office-building', to: 'empresas' },
  { text: 'Colaboradores', icon: 'mdi-account', to: 'colaboradores' }
];

const setLogout = () => {
  authStore.logout();
  router.replace({ name: 'login' });
}
</script>
