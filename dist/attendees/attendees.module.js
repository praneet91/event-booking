"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendeesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const attendees_service_1 = require("./attendees.service");
const attendees_controller_1 = require("./attendees.controller");
const attendee_entity_1 = require("./entities/attendee.entity");
let AttendeesModule = class AttendeesModule {
};
exports.AttendeesModule = AttendeesModule;
exports.AttendeesModule = AttendeesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([attendee_entity_1.Attendee])],
        controllers: [attendees_controller_1.AttendeesController],
        providers: [attendees_service_1.AttendeesService],
        exports: [attendees_service_1.AttendeesService],
    })
], AttendeesModule);
//# sourceMappingURL=attendees.module.js.map