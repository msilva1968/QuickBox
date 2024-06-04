import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getCustomRepository } from "typeorm";
import { CriaEntregaDTO } from "./dto/CriaEntrega.dto";
import { EntregaEntity } from "./entrega.entity";
import { StatusEntrega } from "src/utils/enums/status-entrega.enum";
import { ClienteEntity } from "../clientes/cliente.entity";


@Injectable()
export class EntregaService {
  constructor(
    @InjectRepository(EntregaEntity)
    private entregaRepository: Repository<EntregaEntity>,
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
   
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

  //async atualizarAguardandoEntrega(aguardandoEntrega: string) {
//
  //  const entrega = await this.entregaRepository.findby(aguardandoEntrega);
//
  //  entrega.status = StatusEntrega.AGUARDANDO;
//
  //  return await this.salvar(entrega);
  //}

  private async buscarPorId(id: number) {
    const existeEntrega = await this.entregaRepository.findOneBy({ id });

    if (!existeEntrega) {
      throw new NotFoundException('Entrega não existe');
    }
    return existeEntrega;
  }

  async atualizarAguardandoEntrega(id: number) {
    const entrega = await this.buscarPorId(id);

    entrega.status = StatusEntrega.AGUARDANDO;

    return await this.salvar(entrega);
  }

  async atualizarRotaEntrega(id: number) {
    const entrega = await this.buscarPorId(id);

    entrega.status = StatusEntrega.EM_ROTA;

    return await this.salvar(entrega);
  }

  public async listaEntregaPorEntregador(entregadorId: string) {
    const entregas = await this.entregaRepository.findBy({entregadorId});

    if (!entregas) {
      throw new NotFoundException('Não existe entrega!');
    }
    return entregas;
  }
  public async listaEntregaPorEmpresa(clienteId: string) {
    const entregas = await this.entregaRepository.findBy({clienteId});

    if (!entregas) {
      throw new NotFoundException('Não existe entrega!');
    }
    return entregas;
  }

  private async gerarSequencial()
  {
    var entrega= await this.entregaRepository.maximum("id");

    if(entrega)
      return entrega + 1;

    return 1;

  }

  async listarEntregas() {
    return await this.entregaRepository.find();
  }

   async buscarEntregaPorLocalizacao(localizacao: string) {
    const status = StatusEntrega.PENDENTE;
    const existeEntrega = await this.entregaRepository.findBy({ status });
    console.log(localizacao);

    if (!existeEntrega) {
      throw new NotFoundException('Entrega não existe');
    }

     const clienteIds = existeEntrega.map(entrega => entrega.clienteId);
 
     const clientes = await this.clienteRepository.createQueryBuilder("cliente")
     .where("cliente.id IN (:...ids)", { ids: clienteIds })
     .getMany();

        const coordenadas = clientes.map(cliente => {
        const distancia = calcularDistancia(localizacao, cliente.coordenada);
        return {
          entregaId: existeEntrega.find(entrega => entrega.clienteId === cliente.id)?.id,
          clienteId: cliente.id,
          coordenada: cliente.coordenada,
          nome: cliente.nome,
          distancia: distancia // Adicionando ': distancia' para especificar o valor da propriedade
        };
      });
  
    // Ordenar pelo mais próximo
    coordenadas.sort((a, b) => a.distancia - b.distancia);
  
    // Retornar as 5 mais próximas
    const cincoMaisProximas = coordenadas.slice(0, 5);
  
    return cincoMaisProximas;
  }


}
function calcularDistancia(localizacao1: string, localizacao2: string): number {
  const [lat1, lon1] = localizacao1.split(',').map(parseFloat);
  const [lat2, lon2] = localizacao2.split(',').map(parseFloat);

  const R = 6371e3; // Raio da Terra em metros
  const phi1 = toRadians(lat1);
  const phi2 = toRadians(lat2);
  const deltaPhi = toRadians(lat2 - lat1);
  const deltaLambda = toRadians(lon2 - lon1);

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distancia = R * c; // Distância em metros

  const distanciaEmKm = distancia / 1000; // Converter para quilômetros

  return distanciaEmKm;
}

  
  function toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }
  
  
  


