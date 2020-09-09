export interface ICreateProductRequest {
  name: string;
  description?: string;
  price: number;
  provider: number;
  barcode: number;
  cost: number;
  stock: number;
  validity: Date;
}

export interface IUpdateProductRequest extends ICreateProductRequest {
  id: number;
}
