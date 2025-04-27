import { Booking } from '../../bookings/entities/booking.entity';
export declare class Event {
    id: string;
    title: string;
    description: string;
    date: Date;
    country: string;
    capacity: number;
    bookedCount: number;
    bookings: Booking[];
    createdAt: Date;
    updatedAt: Date;
}
