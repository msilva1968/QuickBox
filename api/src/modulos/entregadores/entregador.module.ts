import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregadorEntity } from './entregador.entity';
import { EntregadorService } from './entregador.service';
import { EntregadorController } from './entregador.controller';

@Module({

    imports: [TypeOrmModule.forFeature([EntregadorEntity])],
    controllers: [EntregadorController],
    providers: [EntregadorService],
    exports: [EntregadorService],
})
export class EntregadorModule { }