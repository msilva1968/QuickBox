import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'clientes' })
export class ClienteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'cnpj', length: 14, nullable: false })
  cnpj: string;

  @Column({ name: 'cep', length: 8, nullable: false })
  cep: string;

  @Column({ name: 'bairro', length: 100, nullable: false })
  bairro: string;

  @Column({ name: 'cidade', length: 100, nullable: false })
  cidade: string;

  @Column({ name: 'estado', length: 2, nullable: false })
  estado: string;

  @Column({ name: 'logradouro', length: 200, nullable: false })
  logradouro: string;

  @Column({ name: 'numero', length: 10, nullable: false })
  numero: string;

  @Column({ name: 'complemento', length: 50, nullable: false })
  complemento: string;

  @Column({ name: 'coordenada', length: 100, nullable: false })
  coordenada: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Column({ name: 'senha', length: 256, nullable: false })
  senha: string;

}