import { recursosApi } from '@/api/recursosApi';
import type { AuthResponseLogin } from '../interfaces/auth.response.ts';

export const loginAction = async (email: string, password: string) => {
  try {
    const { data } = await recursosApi.post<AuthResponseLogin>('auth/login', {
      email,
      password,
    });

    return {
      ok: true,
      token: data.data.access_token,
      message: data.message,
    };
  } catch (error) {
    console.error('Error al iniciar sesión', error);
    return {
      ok: false,
      token: null,
      message: 'Error al iniciar sesión',
    };
  }
};
