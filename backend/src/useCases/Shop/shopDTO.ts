export interface ICreateShopRequest {
  name: string;
  identification: string;
  phone?: string;
  email: string;
  address: string;
}

export interface IUpdateShopRequest extends ICreateShopRequest {
  id: number;
}
