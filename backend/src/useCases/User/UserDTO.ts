export interface ICreateUserRequest {
  name: string;
  password: string;
  question: string;
  response: string;
  admin: boolean;
  // checkPassword(): Promise<boolean>;
}
