export interface MarcaGeneralI {
    brands: MarcaI[];
    total:      number;
}

export interface MarcaI {
    _id:     string;
    name:  string;
    description: string;
    usuario: UsuarioBrand;
}

export interface UsuarioBrand {
    _id: string;
}

export interface MarcaByIdI {
    marca: MarcaI;
    msg:  string;
}

