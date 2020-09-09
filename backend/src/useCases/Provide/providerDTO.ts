export interface ICreateProviderRequest {
  name: string;
  description?: string;
  phone: string;
  email: string;
  identification: string;
  // products?: number[];
}
export interface IUpdateProviderRequest extends ICreateProviderRequest {
  id: number;
}
