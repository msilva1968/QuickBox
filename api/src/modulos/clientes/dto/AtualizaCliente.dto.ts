import { PartialType } from "@nestjs/mapped-types";
import { CriaClienteDTO } from "./CriaCliente.dto";

export class AtualizaClienteDTO extends PartialType(CriaClienteDTO) { }