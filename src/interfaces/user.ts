export interface LoginI{
    name:string;
    token:string;
}
export interface UserBody{
    email:string,
    msg:string,
    token:string,
    user:User
}
export interface User {
    email: string;
    name: string;
    estado: boolean;
    image: string;
    role: Role;
    uuid: string;
    telefono: string;
    direccion: string;
    latitud: string;
    longitud: string;
}

export interface Role{
    description:string;
    name:string;
    status:boolean;
    _id:string
}

// 
export interface UsuariosResponse {
    users: Usuario[];
    total:   number;
}

export interface Usuario {
    role:      Role;
    estado:   boolean;
    google:   boolean;
    telefono: number;
    name:   string;
    email:   string;
    image:      string;
    uuid:      string;
}
