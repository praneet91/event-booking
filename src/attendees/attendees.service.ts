import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendee } from './entities/attendee.entity';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';

@Injectable()
export class AttendeesService {
  constructor(
    @InjectRepository(Attendee)
    private readonly attendeesRepository: Repository<Attendee>,
  ) {}

  async create(createAttendeeDto: CreateAttendeeDto): Promise<Attendee> {
    const attendee = this.attendeesRepository.create(createAttendeeDto);
    return this.attendeesRepository.save(attendee);
  }

  async findAll(): Promise<Attendee[]> {
    return this.attendeesRepository.find();
  }

  async findOne(id: string): Promise<Attendee> {
    const attendee = await this.attendeesRepository.findOne({ where: { id } });
    if (!attendee) {
      throw new NotFoundException(`Attendee with ID ${id} not found`);
    }
    return attendee;
  }

  async update(id: string, updateAttendeeDto: UpdateAttendeeDto): Promise<Attendee> {
    const attendee = await this.findOne(id);
    this.attendeesRepository.merge(attendee, updateAttendeeDto);
    return this.attendeesRepository.save(attendee);
  }

  async remove(id: string): Promise<void> {
    const attendee = await this.findOne(id);
    await this.attendeesRepository.remove(attendee);
  }
} 