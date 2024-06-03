import { Body, Controller, Param, Post, Put } from "@nestjs/common";
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

}
