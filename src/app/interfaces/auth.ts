type Rol = "admin" | "operador" |"conductor"| "poveedor"
export interface RegisterPostData {
  fullName: string;
  email: string;
  password: string;
  rol: Rol;
}


export interface User extends RegisterPostData {
  id: string;
}

