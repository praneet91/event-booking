import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';
import { EventsModule } from '../events/events.module';
import { AttendeesModule } from '../attendees/attendees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    EventsModule,
    AttendeesModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {} 