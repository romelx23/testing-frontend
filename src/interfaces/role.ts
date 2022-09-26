export interface RoleResponse {
    roles: Role[];
}

export interface Role {
    estado: boolean;
    _id:    string;
    rol:    string;
}
