import { AttendeesService } from './attendees.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { Attendee } from './entities/attendee.entity';
export declare class AttendeesController {
    private readonly attendeesService;
    constructor(attendeesService: AttendeesService);
    create(createAttendeeDto: CreateAttendeeDto): Promise<Attendee>;
    findAll(): Promise<Attendee[]>;
    findOne(id: string): Promise<Attendee>;
    update(id: string, updateAttendeeDto: UpdateAttendeeDto): Promise<Attendee>;
    remove(id: string): Promise<void>;
}
