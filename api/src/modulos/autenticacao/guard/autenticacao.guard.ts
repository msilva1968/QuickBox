import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(contexto: ExecutionContext): Promise<boolean> {
    const requisicao = contexto.switchToHttp().getRequest();
    const token = this.extrairTokenDoCabecalho(requisicao);
    if (!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      requisicao.usuario = payload;
      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('JWT inválido');
    }
  }

  private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
    const headers = requisicao.headers as any;
    const [tipo, token] = headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}