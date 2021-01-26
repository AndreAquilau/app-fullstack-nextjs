import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

@Entity('connectiontest')
export default class ConnectionTest extends BaseEntity {
  constructor(i: number) {
    super();
    this.i = i;
  }

  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: number;

  @Column({
    type: 'bigint',
  })
  i!: number;
}
