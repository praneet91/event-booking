import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { EventsService } from '../events/events.service';
import { AttendeesService } from '../attendees/attendees.service';

describe('BookingsService', () => {
  let service: BookingsService;
  let repository: Repository<Booking>;
  let eventsService: EventsService;
  let attendeesService: AttendeesService;

  const mockBookingRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockEventsService = {
    findOne: jest.fn(),
    update: jest.fn(),
  };

  const mockAttendeesService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: getRepositoryToken(Booking),
          useValue: mockBookingRepository,
        },
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
        {
          provide: AttendeesService,
          useValue: mockAttendeesService,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    repository = module.get<Repository<Booking>>(getRepositoryToken(Booking));
    eventsService = module.get<EventsService>(EventsService);
    attendeesService = module.get<AttendeesService>(AttendeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a booking successfully', async () => {
      const createBookingDto: CreateBookingDto = {
        eventId: '1',
        attendeeId: '1',
      };

      const mockEvent = {
        id: '1',
        title: 'Test Event',
        capacity: 100,
        bookedCount: 0,
      };

      const mockAttendee = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      };

      const expectedBooking = {
        id: '1',
        ...createBookingDto,
        isCancelled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockEventsService.findOne.mockResolvedValue(mockEvent);
      mockAttendeesService.findOne.mockResolvedValue(mockAttendee);
      mockBookingRepository.findOne.mockResolvedValue(null);
      mockBookingRepository.create.mockReturnValue(expectedBooking);
      mockBookingRepository.save.mockResolvedValue(expectedBooking);
      mockEventsService.update.mockResolvedValue({
        ...mockEvent,
        bookedCount: 1,
      });

      const result = await service.create(createBookingDto);

      expect(mockEventsService.findOne).toHaveBeenCalledWith('1');
      expect(mockAttendeesService.findOne).toHaveBeenCalledWith('1');
      expect(mockBookingRepository.create).toHaveBeenCalledWith(createBookingDto);
      expect(mockBookingRepository.save).toHaveBeenCalledWith(expectedBooking);
      expect(result).toEqual(expectedBooking);
    });

    it('should throw error when event is not found', async () => {
      const createBookingDto: CreateBookingDto = {
        eventId: '1',
        attendeeId: '1',
      };

      mockEventsService.findOne.mockResolvedValue(null);

      await expect(service.create(createBookingDto)).rejects.toThrow('Event with ID 1 not found');
    });
  });

  describe('findByEventId', () => {
    it('should return bookings for a specific event', async () => {
      const eventId = '1';
      const expectedBookings = [
        {
          id: '1',
          eventId: '1',
          attendeeId: '1',
          isCancelled: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockEventsService.findOne.mockResolvedValue({ id: eventId });
      mockBookingRepository.find.mockResolvedValue(expectedBookings);

      const result = await service.findByEventId(eventId);

      expect(mockEventsService.findOne).toHaveBeenCalledWith(eventId);
      expect(mockBookingRepository.find).toHaveBeenCalledWith({
        where: { eventId },
        relations: ['event', 'attendee'],
      });
      expect(result).toEqual(expectedBookings);
    });
  });
}); 