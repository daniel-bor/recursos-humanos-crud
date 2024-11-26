import { recursosApi } from '@/api/recursosApi';
import type { Colaborador } from '../interfaces/colaborador.interface';

export const updateColaboradoresAction = async (data: Colaborador) => {
  try {
    const response = await recursosApi.put(`/colaboradores/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el colaborador: ${data.id}`, error);
    throw new Error(`Error al actualizar el colaborador: ${data.id}`);
  }
};
