export interface ICreateSaleRequest {
  items: { product: number; quantity: number }[];
  payment: string;
  total: number;
  user: number;
}
