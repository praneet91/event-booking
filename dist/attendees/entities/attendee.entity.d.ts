import { Booking } from '../../bookings/entities/booking.entity';
export declare class Attendee {
    id: string;
    name: string;
    email: string;
    phone: string;
    bookings: Booking[];
    createdAt: Date;
    updatedAt: Date;
}
