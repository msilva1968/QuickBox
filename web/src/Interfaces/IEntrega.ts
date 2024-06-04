import { StatusEntrega } from "../types/status-entrega.enum";

export default interface IEntrega {
    
    clienteId: string;
    cep: string;
    bairro: string;
    cidade: string;
    estado: string;
    logradouro: string;
    numero: string;
    complemento: string;
    peso: string;
    altura: string;
    largura: string;
    latitude: string;
    longitude: string;
    
}

export default interface IListaEntrega {
    id: string
    clienteId: string
    status: StatusEntrega
    codigo_entrega: string
    codigo_confirmacao: string
    codigo_coleta: string
}