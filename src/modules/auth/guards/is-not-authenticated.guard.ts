import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatusEnum } from '../interfaces/auth.status.enum';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  await authStore.checkAuthStatus();

  if (authStore.authStatus === AuthStatusEnum.Authenticated) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
};

export default isNotAuthenticatedGuard;
