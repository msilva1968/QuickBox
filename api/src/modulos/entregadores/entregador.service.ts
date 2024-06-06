import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EntregadorEntity } from "./entregador.entity";
import { CriaEntregadorDTO } from "./dto/CriaEntregador.dto";
import { ListaEntregadorDTO } from "./dto/ListaEntregador.dto";


export class EntregadorService {

    constructor(
        @InjectRepository(EntregadorEntity)
        private readonly entregadorRepository: Repository<EntregadorEntity>,
      ) { }

      private async salvar(entregadorEntity: EntregadorEntity) {
        return await this.entregadorRepository.save(entregadorEntity);
      }

      async emailExiste(email: string) {
        return this.entregadorRepository.findOneBy({ email });
      }

      private async buscarporId(id: string) {
        const existeEntregador = await this.entregadorRepository.findOneBy({ id });

        if (!existeEntregador) {
            throw new NotFoundException('Entregador não existe');
        }
        return existeEntregador;
      }

      async buscarEntregador(id: string) {
        const cliente = await this.entregadorRepository.findBy({ id });
        return cliente;
      }
      
      async salvarEntregador(entregadorEntity: EntregadorEntity) {
        return await this.salvar(entregadorEntity);
      }

      async listarEntregador() {
        return await this.entregadorRepository.find();

      }

      async buscarEntregadorPorId(id: string) {
        const entregador = await this.buscarporId(id);
        return entregador;
      }

      async atualizarEntregador(id: string, dadosEntregador: Partial<EntregadorEntity>) {

        const dadosNaoAtualizar = ['id', 'entregadorId'];
        const entregador = await this.buscarporId(id);
        Object.entries(dadosEntregador).forEach(([chave, valor]) => {
            if (dadosNaoAtualizar.includes(chave)) {
                return;
            }
            entregador[chave] = valor;
        });

        return await this.salvar(entregador);        
      }

      async removerEntregador(id: string) {
        return await this.entregadorRepository.delete(id);
      }

      async criarEntregador(dadosEntregador: CriaEntregadorDTO) {
        const entregadorEntity: EntregadorEntity = new EntregadorEntity();

        entregadorEntity.nome = dadosEntregador.nome;
        entregadorEntity.cpf = dadosEntregador.cpf;
        entregadorEntity.cnh = dadosEntregador.cnh;
        entregadorEntity.endereco = dadosEntregador.endereco;
        entregadorEntity.email = dadosEntregador.email;
        entregadorEntity.senha = dadosEntregador.senha;

        this.salvarEntregador(entregadorEntity);

        return new ListaEntregadorDTO(entregadorEntity.id, entregadorEntity.nome, entregadorEntity.cpf, entregadorEntity.cnh, entregadorEntity.endereco, entregadorEntity.email );

      }

      async listarentregadoresSalvos(){
        const entregadoresSalvos = await this.listarEntregador();

        const entregadorLista = entregadoresSalvos.map(entregador => new ListaEntregadorDTO(
            entregador.id,
            entregador.nome,
            entregador.cpf,
            entregador.cnh,
            entregador.endereco,
            entregador.email
        ));

        return entregadorLista;

      }

}