import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CriaEntregaDTO } from "./dto/CriaEntrega.dto";
import { EntregaEntity } from "./entrega.entity";
import { StatusEntrega } from "src/utils/enums/status-entrega.enum";


@Injectable()
export class EntregaService {
  constructor(
    @InjectRepository(EntregaEntity)
    private entregaRepository: Repository<EntregaEntity>,
   
  ) {}

  async criaEntrega(criaEntregaDTO: CriaEntregaDTO): Promise<EntregaEntity> {
    const entregaEntity = new EntregaEntity();
    Object.assign(entregaEntity, criaEntregaDTO);
    entregaEntity.status = StatusEntrega.PENDENTE;
    entregaEntity.id = await this.gerarSequencial();
    entregaEntity.codigoEntrega =  await this.gerarCodigoEntrega(entregaEntity);
    entregaEntity.codigoConfirmacao = await this.gerarCodigoRandom();
    entregaEntity.codigoColeta =  await this.gerarCodigoRandom();
    return this.entregaRepository.save(entregaEntity);

  }



  private async gerarCodigoEntrega(entregaEntity: EntregaEntity): Promise<string> {
    
    return `${entregaEntity.estado.toUpperCase()}${entregaEntity.id.toString().padStart(6, '0')}`;
  }

  private async gerarCodigoRandom(): Promise<string> {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    const randomLetters = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
    const randomNumbers = Array.from({ length: 3 }, () => numbers[Math.floor(Math.random() * numbers.length)]).join('');

    return `${randomLetters}${randomNumbers}`;
  }

  private async salvar(entregaEntity: EntregaEntity) {
    return await this.entregaRepository.save(entregaEntity);
  }

  private async buscarCodigoConfirmacao(codigoConfirmacao: string) {
    const existeCodigo = await this.entregaRepository.findOneBy({ codigoConfirmacao });

    if (!existeCodigo) {
      throw new NotFoundException('Entrega não existe');
    }
    return existeCodigo;
  }

  async atualizarConfirmacaoEntrega(codigoConfirmacao: string) {

    const entrega = await this.buscarCodigoConfirmacao(codigoConfirmacao);

    entrega.status = StatusEntrega.ENTREGUE;

    return await this.salvar(entrega);
  }

  private async gerarSequencial()
  {
    var entrega= await this.entregaRepository.maximum("id");

    if(entrega)
      return entrega + 1;

    return 1;

  }

}