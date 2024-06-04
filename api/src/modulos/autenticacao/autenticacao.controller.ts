import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticaDTO } from './dto/autentica.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  login(@Body() { email, senha, tipo }: AutenticaDTO) {
    return this.autenticacaoService.login(email, senha, tipo);
  }
}
