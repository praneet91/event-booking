import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto } from './dto/pagination.dto';
export declare class EventsService {
    private readonly eventsRepository;
    constructor(eventsRepository: Repository<Event>);
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
