import { Repository } from 'typeorm';
import { Attendee } from './entities/attendee.entity';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
export declare class AttendeesService {
    private readonly attendeesRepository;
    constructor(attendeesRepository: Repository<Attendee>);
    create(createAttendeeDto: CreateAttendeeDto): Promise<Attendee>;
    findAll(): Promise<Attendee[]>;
    findOne(id: string): Promise<Attendee>;
    update(id: string, updateAttendeeDto: UpdateAttendeeDto): Promise<Attendee>;
    remove(id: string): Promise<void>;
}
