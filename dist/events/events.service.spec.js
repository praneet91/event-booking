"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const events_service_1 = require("./events.service");
const event_entity_1 = require("./entities/event.entity");
describe('EventsService', () => {
    let service;
    let repository;
    const mockEventRepository = {
        create: jest.fn(),
        save: jest.fn(),
        findAndCount: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                events_service_1.EventsService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(event_entity_1.Event),
                    useValue: mockEventRepository,
                },
            ],
        }).compile();
        service = module.get(events_service_1.EventsService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(event_entity_1.Event));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create an event successfully', async () => {
            const createEventDto = {
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
            const paginationDto = {
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
//# sourceMappingURL=events.service.spec.js.map