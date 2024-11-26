export interface GetPaisResponse {
  success: boolean;
  data: Pais[];
}

export interface Pais {
  id?: number;
  nombre: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
