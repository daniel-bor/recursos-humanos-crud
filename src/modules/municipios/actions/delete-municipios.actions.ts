import { recursosApi } from '@/api/recursosApi';
import type { Municipio } from '../interfaces/municipio.interface';

export const deleteMunicipiosAction = async (data: Municipio) => {
  try {
    const response = await recursosApi.delete(`/municipios/${data.id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el municipio: ${data.id}`, error);
    throw new Error(`Error al eliminar el municipio: ${data.id}`);
  }
};
