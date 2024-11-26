import { recursosApi } from '@/api/recursosApi';
import type { GetEmpresaResponse } from '../interfaces/empresa.interface';

export const getEmpresasAction = async () => {
  try {
    const { data } = await recursosApi.get<GetEmpresaResponse>('/empresas');
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error al obtener los empresas', error);
    throw new Error('Error al obtener los empresas');
  }
};
