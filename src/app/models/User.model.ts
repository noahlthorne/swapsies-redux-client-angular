export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthData {
  email: string;
  password: string;
}
