import { PartialType } from "@nestjs/mapped-types";
import { CriaEntregadorDTO } from "./CriaEntregador.dto";


export class AtualizaEntregadorDTO extends PartialType(CriaEntregadorDTO) {}