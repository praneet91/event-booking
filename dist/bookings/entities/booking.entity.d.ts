import { Event } from '../../events/entities/event.entity';
import { Attendee } from '../../attendees/entities/attendee.entity';
export declare class Booking {
    id: string;
    eventId: string;
    attendeeId: string;
    isCancelled: boolean;
    event: Event;
    attendee: Attendee;
    createdAt: Date;
    updatedAt: Date;
}
