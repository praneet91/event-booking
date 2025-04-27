import { EventStatus } from '../entities/event.entity';
export declare class FindEventsDto {
    page?: number;
    limit?: number;
    search?: string;
    status?: EventStatus;
    startDate?: Date;
    endDate?: Date;
    location?: string;
}
