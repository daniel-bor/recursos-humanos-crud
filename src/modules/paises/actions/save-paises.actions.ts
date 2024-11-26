import { recursosApi } from '@/api/recursosApi';
import type { Pais } from '../interfaces/pais.interface';

export const savePaisesAction = async (data: Pais) => {
  try {
    const response = await recursosApi.post('/paises', data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los paises', error);
    throw new Error('Error al obtener los paises');
  }
};
