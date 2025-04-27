import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { PaginationDto } from './dto/pagination.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto): Promise<Event>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Event[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<Event>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<Event>;
    remove(id: string): Promise<void>;
}
