import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClienteEntity } from "./cliente.entity";
import { Repository } from "typeorm";
import { CriaClienteDTO } from "./dto/CriaCliente.dto";
import { ListaClienteDTO } from "./dto/ListaCliente.dto";

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
  ) { }

  private async salvar(clienteEntity: ClienteEntity) {
    return await this.clienteRepository.save(clienteEntity);
  }

  async emailExiste(email: string) {
    return this.clienteRepository.findOneBy({ email });
  }
  
  async buscarPorId(id: string) {
    const existeCliente = await this.clienteRepository.findOneBy({ id });

    if (!existeCliente) {
      throw new NotFoundException('Cliente não existe');
    }
    return existeCliente;
  }

  async salvarCliente(clienteEntity: ClienteEntity) {
    return await this.salvar(clienteEntity);
  }

  async listarClientes() {
    return await this.clienteRepository.find();
  }

  async buscarClientePorId(id: string) {
    const cliente = await this.clienteRepository.findBy({ id });
    return cliente;
  }

  async atualizarCliente(id: string, dadosCliente: Partial<ClienteEntity>) {
    const dadosNaoAtualizaveis = ['id', 'clienteId'];
    const cliente = await this.buscarPorId(id);
    Object.entries(dadosCliente).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      cliente[chave] = valor;
    });

    return await this.salvar(cliente);
  }

  async removerCliente(id: string) {
    return await this.clienteRepository.delete(id);
  }

  async criarCliente(dadosCliente: CriaClienteDTO) {
    const clienteEntity: ClienteEntity = new ClienteEntity();
    clienteEntity.nome = dadosCliente.nome;
    clienteEntity.cnpj = dadosCliente.cnpj;
    clienteEntity.cep = dadosCliente.cep;
    clienteEntity.bairro = dadosCliente.bairro;
    clienteEntity.cidade = dadosCliente.cidade;
    clienteEntity.estado = dadosCliente.estado;
    clienteEntity.logradouro = dadosCliente.logradouro;
    clienteEntity.numero = dadosCliente.numero;
    clienteEntity.complemento = dadosCliente.complemento;
    clienteEntity.coordenada = dadosCliente.coordenada;
    clienteEntity.email = dadosCliente.email;
    clienteEntity.senha = dadosCliente.senha;

    this.salvarCliente(clienteEntity);

    return new ListaClienteDTO(clienteEntity.id, clienteEntity.nome, clienteEntity.cnpj, clienteEntity.email );
  }

  async listarClientesSalvos() {
    const clientesSalvos = await this.listarClientes();

    const clientesLista = clientesSalvos.map(cliente => new ListaClienteDTO(
      cliente.id,
      cliente.nome,
      cliente.cnpj,
      cliente.email
    ));

    return clientesLista;
  }
}