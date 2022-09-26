export interface MarcaGeneralI {
    marcas: MarcaI[];
    total:      number;
}

export interface MarcaI {
    _id:     string;
    nombre:  string;
    usuario: UsuarioBrand;
}

export interface UsuarioBrand {
    _id: string;
}

export interface MarcaByIdI {
    marca: MarcaI;
    msg:  string;
}

