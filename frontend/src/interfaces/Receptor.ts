export interface IReceptor {
  id: number;
  uniprot_id: string;
  entry_name: string;
  organism: string;
  receptor_type: string;
  url: string;
}

export interface ReceptorQueryParams {
  page: number;
  limit: number;
} 