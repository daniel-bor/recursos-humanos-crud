import type { Colaborador } from '@/modules/colaboradores/interfaces/colaborador.interface';
import type { Departamento } from '@/modules/departamentos/interfaces/departamento.interface';
import type { Municipio } from '@/modules/municipios/interfaces/municipio.interface';
import type { Pais } from '@/modules/paises/interfaces/pais.interface';

export interface GetEmpresaResponse {
  success: boolean;
  data: Empresa[];
}

export interface Empresa {
  id?: number;
  nombre_comercial: string;
  razon_social: string;
  nit: string;
  direccion?: null;
  telefono: string;
  correo: string;
  municipio_id: number;
  departamento_id: number;
  pais_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  pais?: Pais;
  departamento?: Departamento;
  municipio?: Municipio;
  colaboradores?: Colaborador[];
}

export interface Pivot {
  empresa_id: number;
  colaborador_id: number;
}
