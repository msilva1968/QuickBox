import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ClienteModule } from './modulos/clientes/cliente.module';
import { EntregadorModule } from './modulos/entregadores/entregador.module';
import { EntregaModule } from './modulos/entregas/entrega.module';
import { AutenticacaoModule } from './modulos/autenticacao/autenticacao.module';
@Module({
  imports: [
    ClienteModule,
    EntregadorModule,
    EntregaModule,
    AutenticacaoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
})
export class AppModule {}
