import { IsEmail, IsNotEmpty } from 'class-validator';
import { TipoLogin } from 'src/utils/enums/TipoLogin';

export class AutenticaDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  tipo: TipoLogin;
}
