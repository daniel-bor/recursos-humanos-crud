import { recursosApi } from '@/api/recursosApi';
import type { GetMunicipioResponse } from '../interfaces/municipio.interface';

export const getMunicipiosAction = async () => {
  try {
    const { data } = await recursosApi.get<GetMunicipioResponse>('/municipios');
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error al obtener los municipios', error);
    throw new Error('Error al obtener los municipios');
  }
};
