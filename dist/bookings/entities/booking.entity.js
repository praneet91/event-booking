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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const event_entity_1 = require("../../events/entities/event.entity");
const attendee_entity_1 = require("../../attendees/entities/attendee.entity");
let Booking = class Booking {
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Booking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Booking.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Booking.prototype, "attendeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "isCancelled", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, event => event.bookings),
    (0, typeorm_1.JoinColumn)({ name: 'eventId' }),
    __metadata("design:type", event_entity_1.Event)
], Booking.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => attendee_entity_1.Attendee, attendee => attendee.bookings),
    (0, typeorm_1.JoinColumn)({ name: 'attendeeId' }),
    __metadata("design:type", attendee_entity_1.Attendee)
], Booking.prototype, "attendee", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "updatedAt", void 0);
exports.Booking = Booking = __decorate([
    (0, typeorm_1.Entity)()
], Booking);
//# sourceMappingURL=booking.entity.js.map