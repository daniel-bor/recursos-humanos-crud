import { recursosApi } from '@/api/recursosApi';
import type { Empresa } from '../interfaces/empresa.interface';

export const deleteEmpresasAction = async (data: Empresa) => {
  try {
    const response = await recursosApi.delete(`/empresas/${data.id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el empresa: ${data.id}`, error);
    throw new Error(`Error al eliminar el empresa: ${data.id}`);
  }
};
