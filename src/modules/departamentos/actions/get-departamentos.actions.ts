import { recursosApi } from '@/api/recursosApi';
import type { GetDepartamentoResponse } from '../interfaces/departamento.interface';

export const getDepartamentosAction = async () => {
  try {
    const { data } = await recursosApi.get<GetDepartamentoResponse>('/departamentos');
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error al obtener los departamentos', error);
    throw new Error('Error al obtener los departamentos');
  }
};
