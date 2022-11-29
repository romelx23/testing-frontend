export interface RoleResponse {
    roles: Role[];
}

export interface Role {
    description:string;
    name:string;
    status:boolean;
    _id:string
}
