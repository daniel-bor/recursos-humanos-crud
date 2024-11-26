import { recursosApi } from '@/api/recursosApi';
import type { GetColaboradorResponse } from '../interfaces/colaborador.interface';

export const getColaboradoresAction = async () => {
  try {
    const { data } = await recursosApi.get<GetColaboradorResponse>('/colaboradores');
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error al obtener los colaboradores', error);
    throw new Error('Error al obtener los colaboradores');
  }
};
