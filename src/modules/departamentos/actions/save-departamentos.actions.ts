import { recursosApi } from '@/api/recursosApi';
import type { Departamento } from '../interfaces/departamento.interface';

export const saveDepartamentosAction = async (data: Departamento) => {
  try {
    const response = await recursosApi.post('/departamentos', data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los departamentos', error);
    throw new Error('Error al obtener los departamentos');
  }
};
