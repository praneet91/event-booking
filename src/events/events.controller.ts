import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully', type: Event })
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events with pagination' })
  @ApiResponse({ status: 200, description: 'Return all events with pagination metadata' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.eventsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by id' })
  @ApiResponse({ status: 200, description: 'Return the event', type: Event })
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({ status: 200, description: 'Event updated successfully', type: Event })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(id);
  }
} 