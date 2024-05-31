import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class CriaEntregadorDTO {

    @IsNotEmpty({message: 'O Nome é de preenchimento obrigatório.'})
    @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' }) 
    nome: string;
    
    @IsNotEmpty({message: 'O CPF é de preenchimento obrigatório.'})
    @MaxLength(11, { message: 'O CPF deve ter no máximo 11 caracteres' })  
    cpf: string;

    @IsNotEmpty({message: 'A CNH é de preenchimento obrigatório.'})
    @MaxLength(13, { message: 'A CNH deve ter no máximo 13 caracteres' }) 
     cnh: string;

    @IsNotEmpty({message: 'O Endereço é de preenchimento obrigatório.'})
    @MaxLength(100, { message: 'O endereço deve ter no máximo 100 caracteres' }) 
    endereco: string;

    @IsNotEmpty({ message: 'O Email é de preenchimento obrigatório.' })
    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    email: string;

    @IsNotEmpty({ message: 'A Senha é de preenchimento obrigatório.' })
    @MaxLength(256, { message: 'A Senha deve ter no máximo 256 caracteres' })
    senha: string;
}