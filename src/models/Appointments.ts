import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Alunos from './Alunos';
import Courses from './Cursos';
import Professores from './Professores';

@Entity('appointments')
export default class Appointments {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'location',
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  location: string;

  @Column({
    name: 'appointment_link',
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  appointmentLink: string;

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

  @ManyToOne((courses) => Courses, (appointments) => appointments.appointments)
  course: Courses;

  @OneToOne((alunos) => Alunos, (appointments) => appointments.appointments)
  aluno: Alunos;
}
