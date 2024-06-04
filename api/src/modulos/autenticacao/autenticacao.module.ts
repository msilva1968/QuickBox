import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { ClienteModule } from '../clientes/cliente.module';
import { EntregadorModule } from '../entregadores/entregador.module';
import { JwtModule } from '@nestjs/jwt';
import { ClienteService } from '../clientes/cliente.service';
import { EntregadorService } from '../entregadores/entregador.service';

@Module({
  imports: [
    ClienteModule,
    EntregadorModule,
    JwtModule.register({
      global: true,
      secret: 'SEGREDO_SECRETO',
      signOptions: { expiresIn: '72h' },
    }),
  ],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
})
export class AutenticacaoModule {}
