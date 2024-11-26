import type { Pais } from '@/modules/paises/interfaces/pais.interface';

export interface GetDepartamentoResponse {
  success: boolean;
  data: Departamento[];
}

export interface Departamento {
  id?: number;
  nombre: string;
  pais_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  pais?: Pais;
}
// Compare this snippet from src/modules/departamentos/views/FormView.ts:
