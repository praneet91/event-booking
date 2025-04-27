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
exports.AttendeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendee_entity_1 = require("./entities/attendee.entity");
let AttendeesService = class AttendeesService {
    constructor(attendeesRepository) {
        this.attendeesRepository = attendeesRepository;
    }
    async create(createAttendeeDto) {
        const attendee = this.attendeesRepository.create(createAttendeeDto);
        return this.attendeesRepository.save(attendee);
    }
    async findAll() {
        return this.attendeesRepository.find();
    }
    async findOne(id) {
        const attendee = await this.attendeesRepository.findOne({ where: { id } });
        if (!attendee) {
            throw new common_1.NotFoundException(`Attendee with ID ${id} not found`);
        }
        return attendee;
    }
    async update(id, updateAttendeeDto) {
        const attendee = await this.findOne(id);
        this.attendeesRepository.merge(attendee, updateAttendeeDto);
        return this.attendeesRepository.save(attendee);
    }
    async remove(id) {
        const attendee = await this.findOne(id);
        await this.attendeesRepository.remove(attendee);
    }
};
exports.AttendeesService = AttendeesService;
exports.AttendeesService = AttendeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendee_entity_1.Attendee)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AttendeesService);
//# sourceMappingURL=attendees.service.js.map