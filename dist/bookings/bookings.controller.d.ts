import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(createBookingDto: CreateBookingDto): Promise<Booking>;
    findAll(): Promise<Booking[]>;
    findOne(id: string): Promise<Booking>;
    cancel(id: string): Promise<Booking>;
    findByEventId(eventId: string): Promise<Booking[]>;
}
