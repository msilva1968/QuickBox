import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregaController } from './entrega.controller';
import { EntregaEntity } from './entrega.entity';
import { EntregaService } from './Entrega.service';
import { ClienteEntity } from '../clientes/cliente.entity';



@Module({
  imports: [TypeOrmModule.forFeature([EntregaEntity]),TypeOrmModule.forFeature([ClienteEntity])],
  controllers: [EntregaController],
  providers: [EntregaService],
})
export class EntregaModule { }