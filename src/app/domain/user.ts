export interface RegisterPostData {
  name: string;
  phone: string;
  email: string;
  password: string;
  department: string
  isActive: boolean
  role: Role;
}

export type Role = "Admin" | "Operador" |"Conductor"| "Proveedor"

export interface User extends RegisterPostData {
  id: string;
}


export type UserBasicInfo = Pick<User, "name" | "phone" | "role"| "isActive">;

export interface UserTable {
  items: UserBasicInfo[];
  total_count: number;
}