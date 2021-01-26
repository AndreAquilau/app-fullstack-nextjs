import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Alunos from './Alunos';
import Courses from './Cursos';

@Entity('reviews')
export default class Reviews {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'review',
    type: 'integer',
    nullable: true,
  })
  review: number;

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

  @OneToMany((courses) => Courses, (reviews) => reviews.reviews)
  courses: Courses[];

  @OneToMany((alunos) => Alunos, (reviews) => reviews.reviews)
  alunos: Alunos[];
}
