<template>
  <div class="w-full">
    <form @submit.prevent="onLogin">
      <div class="min-h-screen bg-gray-50 text-gray-900 flex justify-center">
        <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <h2 class="text-center text-xl font-semibold text-indigo-500">Recursos Humanos</h2>
            </div>
            <div class="mt-12 flex flex-col items-center">
              <h1 class="text-2xl xl:text-3xl font-extrabold">
                Iniciar Sesion
              </h1>
              <div class="w-full flex-1 mt-8">
                <div class="mx-auto max-w-xs">
                  <input v-model="myForm.email"
                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    required type="email" placeholder="Email" />
                  <input v-model="myForm.password"
                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    required type="password" placeholder="Password" />
                  <button type="submit"
                    class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span class="ml-3">
                      Iniciar Sesion
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');">
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore();

const myForm = reactive({
  email: '',
  password: '',
});

const onLogin = async () => {

  const ok = await authStore.login(myForm.email, myForm.password);

  console.log(ok);
  console.log(myForm);
};

watchEffect(() => {
  const email = localStorage.getItem('email');
  if (email) {
    myForm.email = email;
  }
})

</script>

<style scoped></style>
