import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClienteService } from '../clientes/cliente.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EntregadorService } from '../entregadores/entregador.service';
import { EntregadorEntity } from '../entregadores/entregador.entity';
import { ClienteEntity } from '../clientes/cliente.entity';

interface UsuarioPayload {
  sub: string;
  nomeUsuario: string;
}

@Injectable()
export class AutenticacaoService {
  constructor(
    private clienteService: ClienteService,
    private entregadorService: EntregadorService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, senha: string, tipo: string) {
    let usuarioFoiAutenticado = false
    let usuario: EntregadorEntity | ClienteEntity;
    
    if (tipo === 'ENTREGADOR') {
      usuario = await this.entregadorService.emailExiste(email);
    } else if (tipo === 'EMPRESA') {
      usuario = await this.clienteService.emailExiste(email);
    }

    if (!usuario) {
      throw new UnauthorizedException(`${tipo} não existe`);
    }

    usuarioFoiAutenticado = await bcrypt.compare(senha, usuario.senha);
    //usuarioFoiAutenticado = senha === usuario.senha

    if (!usuarioFoiAutenticado) {
      throw new UnauthorizedException(`O email ou senha ${tipo} está incorreto`);
    }

  
    const payload: UsuarioPayload = {
      sub: usuario.id,
      nomeUsuario: usuario.nome,
    };

    return {
      token_acesso: await this.jwtService.signAsync(payload),
      id: usuario.id,
      nome: usuario.nome
    };
  }
}
