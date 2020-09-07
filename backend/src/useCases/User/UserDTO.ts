export interface ICreateUserRequest {
  name: string;
  password: string;
  question: string;
  response: string;
  admin: boolean;
  userId: number;
  // checkPassword(): Promise<boolean>;
}

export interface IDeleteUser {
  id: number;
  userId: number;
}

export interface IShowUser {
  userId: number;
  name: string;
}
