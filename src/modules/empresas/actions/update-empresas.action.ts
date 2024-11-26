import { recursosApi } from '@/api/recursosApi';
import type { Empresa } from '../interfaces/empresa.interface';

export const updateEmpresasAction = async (data: Empresa) => {
  try {
    const response = await recursosApi.put(`/empresas/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el empresa: ${data.id}`, error);
    throw new Error(`Error al actualizar el empresa: ${data.id}`);
  }
};
