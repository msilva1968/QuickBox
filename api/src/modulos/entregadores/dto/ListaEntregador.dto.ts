
export class ListaEntregadorDTO {

    constructor(readonly id: string, readonly nome: string, readonly cpf: string, readonly cnh: string,
        readonly endereco: string, readonly email: string
    ) { }
}