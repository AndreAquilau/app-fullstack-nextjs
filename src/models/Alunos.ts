import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Appointments from './Appointments';
import Reviews from './Reviews';

@Entity('alunos')
export default class Alunos {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'cellphone',
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  cellphone: string;

  @Column({
    name: 'teacher',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  teacher: boolean;

  @Column({
    name: 'coins',
    type: 'integer',
    nullable: false,
    default: 1,
  })
  coins: number;

  @CreateDateColumn({
    name: 'created',
    type: 'timestamp',
  })
  created: Date;

  @UpdateDateColumn({
    name: 'updated',
    type: 'timestamp',
  })
  updated: Date;

  @OneToMany((appointments) => Appointments, (alunos) => alunos.aluno, {
    eager: true,
  })
  appointments: Appointments[];

  @OneToMany((reviews) => Reviews, (alunos) => alunos.alunos)
  reviews: Reviews[];
}
