import { recursosApi } from '@/api/recursosApi';
import type { Colaborador } from '../interfaces/colaborador.interface';

export const deleteColaboradoresAction = async (data: Colaborador) => {
  try {
    const response = await recursosApi.delete(`/colaboradores/${data.id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el colaborador: ${data.id}`, error);
    throw new Error(`Error al eliminar el colaborador: ${data.id}`);
  }
};
