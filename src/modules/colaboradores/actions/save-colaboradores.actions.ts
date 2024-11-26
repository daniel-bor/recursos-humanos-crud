import { recursosApi } from '@/api/recursosApi';
import type { Colaborador } from '../interfaces/colaborador.interface';

export const saveColaboradoresAction = async (data: Colaborador) => {
  try {
    const response = await recursosApi.post('/colaboradores', data);
    return response.data;
  } catch (error) {
    console.error('Error al guardar la colaborador', error);
    throw new Error('Error al guardar la colaborador');
  }
};
