import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Professores from './Professores';

@Entity('available_hours')
export default class AvailableHours {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'day',
    type: 'varchar',
    length: 60,
    nullable: true,
  })
  day: string;

  @Column({
    name: 'hour',
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  hour: string;

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

  @ManyToOne(
    (professores) => Professores,
    (availablehours) => availablehours.availablehours,
  )
  professor: Professores;
}
