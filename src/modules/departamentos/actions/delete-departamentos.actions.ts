import { recursosApi } from '@/api/recursosApi';
import type { Departamento } from '../interfaces/departamento.interface';

export const deleteDepartamentosAction = async (data: Departamento) => {
  try {
    const response = await recursosApi.delete(`/departamentos/${data.id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el departamento: ${data.id}`, error);
    throw new Error(`Error al eliminar el departamento: ${data.id}`);
  }
};
