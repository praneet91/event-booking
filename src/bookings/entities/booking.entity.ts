import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Attendee } from '../../attendees/entities/attendee.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventId: string;

  @Column()
  attendeeId: string;

  @Column({ default: false })
  isCancelled: boolean;

  @ManyToOne(() => Event, event => event.bookings)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @ManyToOne(() => Attendee, attendee => attendee.bookings)
  @JoinColumn({ name: 'attendeeId' })
  attendee: Attendee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 