import { recursosApi } from '@/api/recursosApi';
import type { Municipio } from '../interfaces/municipio.interface';

export const saveMunicipiosAction = async (data: Municipio) => {
  try {
    const response = await recursosApi.post('/municipios', data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los municipios', error);
    throw new Error('Error al obtener los municipios');
  }
};
