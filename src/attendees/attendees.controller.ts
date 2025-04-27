import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AttendeesService } from './attendees.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { Attendee } from './entities/attendee.entity';

@ApiTags('attendees')
@Controller('attendees')
export class AttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new attendee' })
  @ApiResponse({ status: 201, description: 'Attendee created successfully', type: Attendee })
  create(@Body() createAttendeeDto: CreateAttendeeDto): Promise<Attendee> {
    return this.attendeesService.create(createAttendeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all attendees' })
  @ApiResponse({ status: 200, description: 'Return all attendees', type: [Attendee] })
  findAll(): Promise<Attendee[]> {
    return this.attendeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an attendee by id' })
  @ApiResponse({ status: 200, description: 'Return the attendee', type: Attendee })
  findOne(@Param('id') id: string): Promise<Attendee> {
    return this.attendeesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an attendee' })
  @ApiResponse({ status: 200, description: 'Attendee updated successfully', type: Attendee })
  update(@Param('id') id: string, @Body() updateAttendeeDto: UpdateAttendeeDto): Promise<Attendee> {
    return this.attendeesService.update(id, updateAttendeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an attendee' })
  @ApiResponse({ status: 200, description: 'Attendee deleted successfully' })
  remove(@Param('id') id: string): Promise<void> {
    return this.attendeesService.remove(id);
  }
} 