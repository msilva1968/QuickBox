import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class CriaEntregaDTO {

  @IsNotEmpty({ message: 'O Código Cliente não pode ser vazio.' })
  clienteId: string;

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

  @IsNotEmpty({ message: 'O peso não pode ser vazio.' })
  @MaxLength(14, { message: 'O peso precisa ter no máximo 14 caracteres' })
  peso: string;

  @IsNotEmpty({ message: 'O altura não pode ser vazio.' })
  @MaxLength(14, { message: 'O altura precisa ter no máximo 14 caracteres' })
  altura: string;

  @IsNotEmpty({ message: 'O largura não pode ser vazio.' })
  @MaxLength(14, { message: 'O largura precisa ter no máximo 14 caracteres' })
  largura: string;

  @IsNotEmpty({ message: 'O latitude não pode ser vazio.' })
  @MaxLength(14, { message: 'O latitude precisa ter no máximo 14 caracteres' })
  latitude: string;

  @IsNotEmpty({ message: 'O longitude não pode ser vazio.' })
  @MaxLength(14, { message: 'O longitude precisa ter no máximo 14 caracteres' })
  longitude: string;

}