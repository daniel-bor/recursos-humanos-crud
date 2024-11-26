import { recursosApi } from '@/api/recursosApi';
import type { Departamento } from '../interfaces/departamento.interface';

export const updateDepartamentosAction = async (data: Departamento) => {
  try {
    const response = await recursosApi.put(`/departamentos/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el departamento: ${data.id}`, error);
    throw new Error(`Error al actualizar el departamento: ${data.id}`);
  }
};
