import { Body, Controller, Post } from "@nestjs/common";
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

}

 
