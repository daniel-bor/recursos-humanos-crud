import { recursosApi } from '@/api/recursosApi';
import type { Pais } from '../interfaces/pais.interface';

export const deletePaisesAction = async (data: Pais) => {
  try {
    const response = await recursosApi.delete(`/paises/${data.id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el pais: ${data.id}`, error);
    throw new Error(`Error al eliminar el pais: ${data.id}`);
  }
};
