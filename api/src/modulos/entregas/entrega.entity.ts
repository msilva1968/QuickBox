import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusEntrega } from "src/utils/enums/status-entrega.enum";

@Entity({ name: 'entregas' })
export class EntregaEntity {

  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ name: 'cliente_id',  nullable: false })
  clienteId: string;

  @Column({ name: 'entregador_id',  nullable: true })
  entregadorId: string;

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

  @Column({ name: 'peso', length: 14 })
  peso: string;

  @Column({ default: StatusEntrega.PENDENTE })
  status: StatusEntrega;

  @Column({ name:'codigo_entrega', unique: true })
  codigoEntrega: string;

  @Column({ name:'codigo_confirmacao'})
  codigoConfirmacao: string;

  @Column({ name:'codigo_coleta'})
  codigoColeta: string;

  @Column({ name: 'altura', length: 14 })
  altura: string;

  @Column({ name: 'largura', length: 14  })
  largura: string;

  @Column({ name: 'latitude', length: 14  })
  latitude: string;

  @Column({ name: 'longitude', length: 14  })
  longitude: string;


}