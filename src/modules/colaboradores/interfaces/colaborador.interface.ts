import type { Empresa } from '@/modules/empresas/interfaces/empresa.interface';

export interface GetColaboradorResponse {
  success: boolean;
  data: Colaborador[];
}

export interface Colaborador {
  id?: number;
  nombre: string;
  fecha_nacimiento?: string;
  direccion?: string;
  telefono: string;
  correo: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  empresas?: Empresa[];
  empresa_ids: number[];
}

export interface Pivot {
  colaborador_id: number;
  empresa_id: number;
}
