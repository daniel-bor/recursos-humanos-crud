import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatusEnum } from '../interfaces/auth.status.enum';
import { loginAction } from '../actions/login.action';
import { useLocalStorage } from '@vueuse/core';
import { checkAuthAction } from '../actions/check-auth.action';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatusEnum>(AuthStatusEnum.Checking);
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);
      if (!loginResponse.ok) {
        logout();
        return false;
      }

      token.value = loginResponse.token ?? '';
      authStatus.value = AuthStatusEnum.Authenticated;

      return true;
    } catch (error) {
      console.error('Error logging in', error);
      return logout();
    }
  };

  const logout = () => {
    authStatus.value = AuthStatusEnum.Unauthenticated;
    token.value = '';
    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction();

      if (!statusResp.ok) {
        return logout();
      }
      authStatus.value = AuthStatusEnum.Authenticated;
      token.value = statusResp.token;
      return true;
    } catch (error) {
      console.log('Error checking auth status', error);
      return logout();
    }
  };

  return {
    token,
    authStatus,

    // Getters
    isAuthenticated: computed(() => authStatus.value === AuthStatusEnum.Authenticated),
    isChecking: computed(() => authStatus.value === AuthStatusEnum.Checking),
    isUnauthenticated: computed(() => authStatus.value === AuthStatusEnum.Unauthenticated),

    // Actions
    login,
    logout,
    checkAuthStatus,
  };
});
