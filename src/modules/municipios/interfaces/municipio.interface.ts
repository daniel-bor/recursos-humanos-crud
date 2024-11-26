import type { Departamento } from '@/modules/departamentos/interfaces/departamento.interface';

export interface GetMunicipioResponse {
  success: boolean;
  data: Municipio[];
}

export interface Municipio {
  id?: number;
  nombre: string;
  departamento_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  departamento?: Departamento;
}
