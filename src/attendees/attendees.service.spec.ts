import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendeesService } from './attendees.service';
import { Attendee } from './entities/attendee.entity';
import { CreateAttendeeDto } from './dto/create-attendee.dto';

describe('AttendeesService', () => {
  let service: AttendeesService;
  let repository: Repository<Attendee>;

  const mockAttendeeRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendeesService,
        {
          provide: getRepositoryToken(Attendee),
          useValue: mockAttendeeRepository,
        },
      ],
    }).compile();

    service = module.get<AttendeesService>(AttendeesService);
    repository = module.get<Repository<Attendee>>(getRepositoryToken(Attendee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an attendee successfully', async () => {
      const createAttendeeDto: CreateAttendeeDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
      };

      const expectedAttendee = {
        id: '1',
        ...createAttendeeDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAttendeeRepository.create.mockReturnValue(expectedAttendee);
      mockAttendeeRepository.save.mockResolvedValue(expectedAttendee);

      const result = await service.create(createAttendeeDto);

      expect(mockAttendeeRepository.create).toHaveBeenCalledWith(createAttendeeDto);
      expect(mockAttendeeRepository.save).toHaveBeenCalledWith(expectedAttendee);
      expect(result).toEqual(expectedAttendee);
    });
  });

  describe('findOne', () => {
    it('should return a single attendee', async () => {
      const expectedAttendee = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAttendeeRepository.findOne.mockResolvedValue(expectedAttendee);

      const result = await service.findOne('1');

      expect(mockAttendeeRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(expectedAttendee);
    });

    it('should throw NotFoundException when attendee not found', async () => {
      mockAttendeeRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow('Attendee with ID 1 not found');
    });
  });
}); 