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
    entregaEntity.codigoEntrega = this.gerarCodigoEntrega(entregaEntity);
    entregaEntity.codigoConfirmacao = this.gerarCodigoRandom();
    entregaEntity.codigoColeta = this.gerarCodigoRandom();
    return this.entregaRepository.save(entregaEntity);

  }



  private gerarCodigoEntrega(entregaEntity: EntregaEntity): string {
    
    return `${entregaEntity.estado.toUpperCase()}${entregaEntity.id.toString().padStart(6, '0')}`;
  }

  private gerarCodigoRandom(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    const randomLetters = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
    const randomNumbers = Array.from({ length: 3 }, () => numbers[Math.floor(Math.random() * numbers.length)]).join('');

    return `${randomLetters}${randomNumbers}`;
  }

  private async gerarSequencial()
  {
    var entrega= await this.entregaRepository.maximum("id");

    if(entrega)
      return entrega + 1;

    return 1;

  }

}