import { recursosApi } from '@/api/recursosApi';
import type { Pais } from '../interfaces/pais.interface';

export const updatePaisesAction = async (data: Pais) => {
  try {
    const response = await recursosApi.put(`/paises/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el pais: ${data.id}`, error);
    throw new Error(`Error al actualizar el pais: ${data.id}`);
  }
};
