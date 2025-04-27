"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./entities/booking.entity");
const events_service_1 = require("../events/events.service");
const attendees_service_1 = require("../attendees/attendees.service");
let BookingsService = class BookingsService {
    constructor(bookingsRepository, eventsService, attendeesService) {
        this.bookingsRepository = bookingsRepository;
        this.eventsService = eventsService;
        this.attendeesService = attendeesService;
    }
    async create(createBookingDto) {
        const { eventId, attendeeId } = createBookingDto;
        const event = await this.eventsService.findOne(eventId);
        if (!event) {
            throw new common_1.NotFoundException(`Event with ID ${eventId} not found`);
        }
        const attendee = await this.attendeesService.findOne(attendeeId);
        if (!attendee) {
            throw new common_1.NotFoundException(`Attendee with ID ${attendeeId} not found`);
        }
        if (event.bookedCount >= event.capacity) {
            throw new common_1.BadRequestException('Event is at full capacity');
        }
        const existingBooking = await this.bookingsRepository.findOne({
            where: {
                eventId,
                attendeeId,
                isCancelled: false,
            },
        });
        if (existingBooking) {
            throw new common_1.BadRequestException('Attendee has already booked this event');
        }
        const booking = this.bookingsRepository.create(createBookingDto);
        const savedBooking = await this.bookingsRepository.save(booking);
        event.bookedCount += 1;
        await this.eventsService.update(eventId, { bookedCount: event.bookedCount });
        return savedBooking;
    }
    async findAll() {
        return this.bookingsRepository.find({
            relations: ['event', 'attendee'],
        });
    }
    async findOne(id) {
        const booking = await this.bookingsRepository.findOne({
            where: { id },
            relations: ['event', 'attendee'],
        });
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        return booking;
    }
    async findByEventId(eventId) {
        await this.eventsService.findOne(eventId);
        return this.bookingsRepository.find({
            where: { eventId },
            relations: ['event', 'attendee'],
        });
    }
    async cancel(id) {
        const booking = await this.findOne(id);
        if (booking.isCancelled) {
            throw new common_1.BadRequestException('Booking is already cancelled');
        }
        booking.isCancelled = true;
        const cancelledBooking = await this.bookingsRepository.save(booking);
        const event = await this.eventsService.findOne(booking.eventId);
        event.bookedCount -= 1;
        await this.eventsService.update(event.id, { bookedCount: event.bookedCount });
        return cancelledBooking;
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        events_service_1.EventsService,
        attendees_service_1.AttendeesService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map