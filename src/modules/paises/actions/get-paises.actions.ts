import { recursosApi } from '@/api/recursosApi';
import type { GetPaisResponse } from '../interfaces/pais.interface';

export const getPaisesAction = async () => {
  try {
    const { data } = await recursosApi.get<GetPaisResponse>('/paises');
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error al obtener los paises', error);
    throw new Error('Error al obtener los paises');
  }
};
