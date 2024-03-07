export interface User {
  id: number;
  name: string;
  username: string;
  email?: string;
  password?: string;
  idChannel?: number;
  roles: string[];
}
