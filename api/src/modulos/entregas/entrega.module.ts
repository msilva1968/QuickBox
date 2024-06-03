import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregaController } from './entrega.controller';
import { EntregaEntity } from './entrega.entity';
import { EntregaService } from './Entrega.service';



@Module({
  imports: [TypeOrmModule.forFeature([EntregaEntity])],
  controllers: [EntregaController],
  providers: [EntregaService],
})
export class EntregaModule { }