import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Appointments from './Appointments';
import AvailableHours from './AvailableHours';
import AvailableLocations from './AvailableLocations';
import Courses from './Cursos';

@Entity('professores')
export default class Professores {
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
    default: true,
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

  @OneToMany((courses) => Courses, (professores) => professores.professor, {
    eager: true,
  })
  courses: Courses[];

  @OneToMany(
    (availablehours) => AvailableHours,
    (professores) => professores.professor,
    { eager: true },
  )
  availablehours: AvailableHours[];

  @OneToMany(
    (availablelocations) => AvailableLocations,
    (professores) => professores.professor,
    { eager: true },
  )
  availablelocations: AvailableLocations[];
}
