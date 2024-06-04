import { TipoLoginEnum } from "../types/tipo-login.enum";

export interface ILogin {
    email: string;
    senha: string;
    tipo: TipoLoginEnum;
}