import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class CriaClienteDTO {
  @IsNotEmpty({ message: 'O Nome não pode ser vazio.' })
  @MaxLength(100, { message: 'O Nome precisa ter no máximo 100 caracteres' })
  nome: string;

  @IsNotEmpty({ message: 'O CNPJ não pode ser vazio.' })
  @MaxLength(14, { message: 'O CNPJ precisa ter no máximo 14 caracteres' })
  cnpj: string;

  @IsNotEmpty({ message: 'O CEP não pode ser vazio.' })
  cep: string;

  @IsNotEmpty({ message: 'O Bairro não pode ser vazio.' })
  @MaxLength(100, { message: 'O Bairro precisa ter no máximo 100 caracteres' })
  bairro: string;

  @IsNotEmpty({ message: 'A Cidade não pode ser vazio.' })
  @MaxLength(100, { message: 'A Cidade precisa ter no máximo 100 caracteres' })
  cidade: string;

  @IsNotEmpty({ message: 'O Estado não pode ser vazio.' })
  @MaxLength(2, { message: 'O Estado precisa ter no máximo 2 caracteres' })
  estado: string;

  @IsNotEmpty({ message: 'O Logradouro não pode ser vazio.' })
  @MaxLength(200, { message: 'O Logradouro precisa ter no máximo 200 caracteres' })
  logradouro: string;

  @IsNotEmpty({ message: 'O Número não pode ser vazio.' })
  @MaxLength(10, { message: 'O Número precisa ter no máximo 10 caracteres' })
  numero: string;

  @IsNotEmpty({ message: 'O Complemento não pode ser vazio.' })
  @MaxLength(50, { message: 'O Complemento precisa ter no máximo 50 caracteres' })
  complemento: string;

  @IsNotEmpty({ message: 'A coordenada não pode ser vazio.' })
  @MaxLength(100, { message: 'A Coordenada precisa ter no máximo 100 caracteres' })
  coordenada: string;

  @IsNotEmpty({ message: 'O eMail não pode ser vazio.' })
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;

  @IsNotEmpty({ message: 'A Senha não pode ser vazio.' })
  senha: string;
}