import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { EventsService } from '../events/events.service';
import { AttendeesService } from '../attendees/attendees.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
    private readonly eventsService: EventsService,
    private readonly attendeesService: AttendeesService,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { eventId, attendeeId } = createBookingDto;

    // Check if event exists
    const event = await this.eventsService.findOne(eventId);
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    // Check if attendee exists
    const attendee = await this.attendeesService.findOne(attendeeId);
    if (!attendee) {
      throw new NotFoundException(`Attendee with ID ${attendeeId} not found`);
    }

    // Check if event is at capacity
    if (event.bookedCount >= event.capacity) {
      throw new BadRequestException('Event is at full capacity');
    }

    // Check if attendee has already booked this event
    const existingBooking = await this.bookingsRepository.findOne({
      where: {
        eventId,
        attendeeId,
        isCancelled: false,
      },
    });
    if (existingBooking) {
      throw new BadRequestException('Attendee has already booked this event');
    }

    // Create booking
    const booking = this.bookingsRepository.create(createBookingDto);
    const savedBooking = await this.bookingsRepository.save(booking);

    // Update event's booked count
    event.bookedCount += 1;
    await this.eventsService.update(eventId, { bookedCount: event.bookedCount });

    return savedBooking;
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find({
      relations: ['event', 'attendee'],
    });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({
      where: { id },
      relations: ['event', 'attendee'],
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async findByEventId(eventId: string): Promise<Booking[]> {
    // Verify that the event exists
    await this.eventsService.findOne(eventId);
    
    return this.bookingsRepository.find({
      where: { eventId },
      relations: ['event', 'attendee'],
    });
  }

  async cancel(id: string): Promise<Booking> {
    const booking = await this.findOne(id);
    
    if (booking.isCancelled) {
      throw new BadRequestException('Booking is already cancelled');
    }

    booking.isCancelled = true;
    const cancelledBooking = await this.bookingsRepository.save(booking);

    // Update event's booked count
    const event = await this.eventsService.findOne(booking.eventId);
    event.bookedCount -= 1;
    await this.eventsService.update(event.id, { bookedCount: event.bookedCount });

    return cancelledBooking;
  }
} 