import { recursosApi } from '@/api/recursosApi';
import type { Municipio } from '../interfaces/municipio.interface';

export const updateMunicipiosAction = async (data: Municipio) => {
  try {
    const response = await recursosApi.put(`/municipios/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el municipio: ${data.id}`, error);
    throw new Error(`Error al actualizar el municipio: ${data.id}`);
  }
};
