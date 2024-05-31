import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'entregadores'})
export class EntregadorEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'nome', length: 100, nullable: false })
    nome: string;

    @Column({ name: 'cpf', length: 11, nullable: false})
    cpf: string;

    @Column({ name: 'cnh', length: 13, nullable: false})
    cnh: string;

    @Column({ name: 'endereco', length: 100, nullable: false})
    endereco: string;

    @Column({ name: 'email', length: 100, nullable: false })
    email: string;

    @Column({ name: 'senha', length: 256, nullable: false })
    senha: string;
}