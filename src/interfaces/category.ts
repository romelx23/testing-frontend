export interface CategoriaGeneralI {
    categorias: CategoriaI[];
    total:      number;
}

export interface CategoriaI {
    _id:     string;
    name:  string;
    usuario: UsuarioCategoria;
}

export interface UsuarioCategoria {
    _id: string;
}
