import { recursosApi } from '@/api/recursosApi';
import type { AuthResponseLogin } from '../interfaces/auth.response';
import { isAxiosError } from 'axios';

interface CheckError {
  ok: false;
}

interface CheckSuccess {
  ok: true;
  token: string;
}

export const checkAuthAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
    const localToken = localStorage.getItem('token');
    if (localToken && localToken.length < 10) {
      return { ok: false };
    }
    const { data } = await recursosApi.post<AuthResponseLogin>('/auth/profile');

    return {
      ok: true,
      token: data.data.access_token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
      };
    }
    console.log('Error al check profile', error);

    throw new Error('No se pudo verificar la sesión');
  }
};
