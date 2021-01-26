import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Appointments from './Appointments';
import Professores from './Professores';
import Reviews from './Reviews';

@Entity('cursos')
export default class Courses {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'course',
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  course: string;

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

  @ManyToOne((professor) => Professores, (courses) => courses.courses)
  professor: Professores;

  @OneToMany((appointments) => Appointments, (courses) => courses.course, {
    eager: true,
  })
  appointments: Appointments[];

  @OneToMany((reviews) => Reviews, (courses) => courses.courses, {
    eager: true,
  })
  reviews: Reviews[];
}
