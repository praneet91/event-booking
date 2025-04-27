import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { EventsService } from '../events/events.service';
import { AttendeesService } from '../attendees/attendees.service';
export declare class BookingsService {
    private readonly bookingsRepository;
    private readonly eventsService;
    private readonly attendeesService;
    constructor(bookingsRepository: Repository<Booking>, eventsService: EventsService, attendeesService: AttendeesService);
    create(createBookingDto: CreateBookingDto): Promise<Booking>;
    findAll(): Promise<Booking[]>;
    findOne(id: string): Promise<Booking>;
    findByEventId(eventId: string): Promise<Booking[]>;
    cancel(id: string): Promise<Booking>;
}
