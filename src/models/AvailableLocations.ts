import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Professores from './Professores';

@Entity('available_locations')
export default class AvailableLocations {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'location',
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  location: string;

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
    (availablelocations) => availablelocations.availablelocations,
  )
  professor: Professores;
}
