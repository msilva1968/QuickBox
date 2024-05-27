import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './cliente.service';
import { ClienteEntity } from './cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule { }