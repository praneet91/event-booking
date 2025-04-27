import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  country: string;

  @Column()
  capacity: number;

  @Column({ default: 0 })
  bookedCount: number;

  @OneToMany(() => Booking, booking => booking.event)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}