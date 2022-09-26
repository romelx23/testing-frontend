export interface LoginI{
    name:string;
    token:string;
}
export interface UserBody{
    correo:string,
    msg:string,
    token:string,
    usuario:User
}
export interface User {
    correo: string;
    nombre: string;
    estado: boolean;
    img: string;
    rol: string;
    uid: string;
    telefono: string;
    direccion: string;
    latitud: string;
    longitud: string;
}

// 
export interface UsuariosResponse {
    usuario: Usuario[];
    total:   number;
}

export interface Usuario {
    rol:      string;
    estado:   boolean;
    google:   boolean;
    telefono: number;
    nombre:   string;
    correo:   string;
    img:      string;
    uid:      string;
}
