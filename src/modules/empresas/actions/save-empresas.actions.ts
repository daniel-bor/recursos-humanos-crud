import { recursosApi } from '@/api/recursosApi';
import type { Empresa } from '../interfaces/empresa.interface';

export const saveEmpresasAction = async (data: Empresa) => {
  try {
    const response = await recursosApi.post('/empresas', data);
    return response.data;
  } catch (error) {
    console.error('Error al guardar la empresa', error);
    throw new Error('Error al guardar la empresa');
  }
};
