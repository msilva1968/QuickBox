import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriaClienteDTO } from "./dto/CriaCliente.dto";
import { AtualizaClienteDTO } from "./dto/AtualizaCliente.dto";
import { ClienteService } from "./cliente.service";
import { HashSenhaPipe } from "src/recursos/pipes/hash-senha-pipe";

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
  ) { }

  @Post()
  async criarCliente(
    @Body() { senha, ...dadosCliente }: CriaClienteDTO,
    @Body('senha', HashSenhaPipe) senhaHasheada: string){
    const novoCliente = await this.clienteService.criarCliente(
      { ...dadosCliente, senha: senhaHasheada },
    );

    return {
      cliente: novoCliente,
      messagem: 'Cliente cadastrado com sucesso!',
    };
  }

  @Get()
  async listaClientes() {
    const listaClientes = await this.clienteService.listarClientesSalvos();
    return listaClientes;
  }

  @Get('/:id')
  async buscaPorId(@Param('id') id: string) {
    const cliente = await this.clienteService.buscarClientePorId(id);
    return cliente;
  }

  @Get('editacliente/:id')
  async editaCliente(@Param('id') id: string) {
    const cliente = await this.clienteService.buscarPorId(id);
    return cliente;
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosCliente: AtualizaClienteDTO,
    @Body('senha', HashSenhaPipe) senhaHasheada: string) 
    {
    const clienteAlterado = await this.clienteService.atualizarCliente(
      id,
      { ...dadosCliente, senha: senhaHasheada },
    );

    return {
      mensagem: 'Cliente atualizado com sucesso!',
      cliente: clienteAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const clienteRemovido = await this.clienteService.removerCliente(id);

    return {
      mensagem: 'Cliente excluído com sucesso',
      cliente: clienteRemovido,
    };
  }
}