import { Role } from "./user";

export interface ProviderI{
    image: string;
    phone: number;
    name: string;
    email: string;
    address: string;
    uuid: string;
    role: Role;
    status: boolean;
}

export interface ProviderResponse {
    ok:boolean;
    message:string;
    providers: ProviderI[];
    total:   number;
}

export interface ProviderResponseCreate {
    ok:boolean;
    message:string;
    provider: ProviderI;
}

export interface ProviderForm{
    image: string;
    phone: string;
    name: string;
    email: string;
    address: string;
}