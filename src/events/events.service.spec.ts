import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { PaginationDto } from './dto/pagination.dto';

describe('EventsService', () => {
  let service: EventsService;
  let repository: Repository<Event>;

  const mockEventRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useValue: mockEventRepository,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    repository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an event successfully', async () => {
      const createEventDto: CreateEventDto = {
        title: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        country: 'Test Country',
        capacity: 100,
      };

      const expectedEvent = {
        id: '1',
        ...createEventDto,
        bookedCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockEventRepository.create.mockReturnValue(expectedEvent);
      mockEventRepository.save.mockResolvedValue(expectedEvent);

      const result = await service.create(createEventDto);

      expect(mockEventRepository.create).toHaveBeenCalledWith(createEventDto);
      expect(mockEventRepository.save).toHaveBeenCalledWith(expectedEvent);
      expect(result).toEqual(expectedEvent);
    });
  });

  describe('findAll', () => {
    it('should return paginated events', async () => {
      const paginationDto: PaginationDto = {
        page: 1,
        limit: 10,
      };

      const mockEvents = [
        {
          id: '1',
          title: 'Test Event 1',
          description: 'Test Description 1',
          date: new Date(),
          country: 'Test Country',
          capacity: 100,
          bookedCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Test Event 2',
          description: 'Test Description 2',
          date: new Date(),
          country: 'Test Country',
          capacity: 200,
          bookedCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const total = 2;

      mockEventRepository.findAndCount.mockResolvedValue([mockEvents, total]);

      const result = await service.findAll(paginationDto);

      expect(mockEventRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        order: {
          date: 'ASC',
        },
      });
      expect(result).toEqual({
        data: mockEvents,
        meta: {
          total,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });
    });
  });
}); 