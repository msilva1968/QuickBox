export default interface ICliente {
    nome: string,
    cnpj: string,
    cep: string,
    bairro: string,
    cidade: string,
    estado: string,
    logradouro: string,
    numero: string,
    complemento: string,
    coordenada: string,
    email: string,
    senha: string
  }

  export default interface IListaCliente {
    id: string, 
    nome: string, 
    cnpj: string, 
    email: string
  }
