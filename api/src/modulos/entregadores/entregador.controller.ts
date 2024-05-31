import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EntregadorService } from "./entregador.service";
import { CriaEntregadorDTO } from "./dto/CriaEntregador.dto";
import { AtualizaEntregadorDTO } from "./dto/AtualizaEntregador.dto";


@Controller('entregador')
export class EntregadorController {
  constructor(
    private readonly entregadorService: EntregadorService,
  ) { }

  @Post()
  async criarEntregador(@Body() dadosEntregador: CriaEntregadorDTO) {
    const novoEntregador = await this.entregadorService.criarEntregador(dadosEntregador);

    return {
        entregador: novoEntregador,
        messagem: 'Entregador cadastrado com sucesso.'
    }
  }

  @Get()
  async listaEntregador() {
    const listaEntregador = await this.entregadorService.listarentregadoresSalvos();
    return listaEntregador;
  }


  @Get('/:id')
  async buscaPorId(@Param('id') id: string) {
    const entregador = await this.entregadorService.buscarEntregadorPorId(id);
    return entregador;
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosEntregador: AtualizaEntregadorDTO,
  ) {
    const entregadorAlterado = await this.entregadorService.atualizarEntregador(
      id,
      dadosEntregador,
    );
      return {
      mensagem: 'Entregador atualizado com sucesso!',
      entregador: entregadorAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const entregadorRemovido = await this.entregadorService.removerEntregador(id);

    return {
      mensagem: 'Entregador excluído com sucesso',
      entregador: entregadorRemovido,
    };
  }
}