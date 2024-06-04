import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CriaEntregaDTO } from "./dto/CriaEntrega.dto";
import { EntregaService } from "./Entrega.service";
import { EntregaEntity } from "./entrega.entity";

@Controller('entrega')
export class EntregaController {
  constructor(
    private readonly entregaService: EntregaService,
  ) { }


  @Post()
  create(@Body() criaEntregaDTO: CriaEntregaDTO): Promise<EntregaEntity> {
    return this.entregaService.criaEntrega(criaEntregaDTO);
  }

  @Get()
  async listarEntregas() {
    const listaEntregas = await this.entregaService.listarEntregas();
    return listaEntregas;
  }

  @Get('/empresa/:clienteId')
  async listaEntregaPorEmpresa(@Param('clienteId') clienteId: string) {
    const entregas = await this.entregaService.listaEntregaPorEmpresa(clienteId);
    return entregas;
  }
  @Get('/entregador/:EntregadorId')
  async listaEntregaPorEntregador(@Param('EntregadorId') EntregadorId: string) {
    const entregas = await this.entregaService.listaEntregaPorEntregador(EntregadorId);
    return entregas;
  }

  
  @Get('/localizacao/:localizacao')
  async buscarPorLocalizacao(@Param('localizacao') localizacao: string) {
    const entrega = await this.entregaService.buscarEntregaPorLocalizacao(localizacao);
    return entrega;
  }

  @Put('/:codigoConfirmacao')
  async atualiza(
    @Param('codigoConfirmacao') codigoConfirmacao: string,
  ) {
    const entregaConfirmada = await this.entregaService.atualizarConfirmacaoEntrega(
      codigoConfirmacao,
    );

    return {
      mensagem: 'Entrega atualizada com sucesso!',
      entrega: entregaConfirmada,
    };
  }

  @Put('/aguardandoEntrega/:aguardandoEntrega')
  async aguardandoEntrega(
    @Param('aguardandoEntrega') aguardandoEntrega: number,
  ) {
    const entregaAguardando = await this.entregaService.atualizarAguardandoEntrega(
      aguardandoEntrega,
    );

    return {
      mensagem: 'Entrega atualizada com sucesso!',
      entrega: entregaAguardando,
    };
  }

  @Put('/rotaEntrega/:rotaEntrega')
  async rotaEntrega(
    @Param('rotaEntrega') rotaEntrega: number,
  ) {
    const entregaAguardando = await this.entregaService.atualizarRotaEntrega(
      rotaEntrega,
    );

    return {
      mensagem: 'Entrega atualizada com sucesso!',
      entrega: rotaEntrega,
    };
  }

}

 
