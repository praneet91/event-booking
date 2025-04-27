import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully', type: Booking })
  create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({ status: 200, description: 'Return all bookings', type: [Booking] })
  findAll(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a booking by id' })
  @ApiResponse({ status: 200, description: 'Return the booking', type: Booking })
  findOne(@Param('id') id: string): Promise<Booking> {
    return this.bookingsService.findOne(id);
  }

  @Post(':id/cancel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel a booking' })
  @ApiResponse({ status: 200, description: 'Booking cancelled successfully', type: Booking })
  cancel(@Param('id') id: string): Promise<Booking> {
    return this.bookingsService.cancel(id);
  }

  @Get('event/:eventId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all bookings for a specific event' })
  @ApiResponse({ status: 200, description: 'Return all bookings for the event', type: [Booking] })
  findByEventId(@Param('eventId') eventId: string): Promise<Booking[]> {
    return this.bookingsService.findByEventId(eventId);
  }
} 