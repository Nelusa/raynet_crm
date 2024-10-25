export interface ApiResponse<T> {
  data: T;
  totalItems?: number;
  error?: string;
}
