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
exports.CategoriesService = void 0;
const database_service_1 = require("../database/database.service");
const common_1 = require("@nestjs/common");
let CategoriesService = class CategoriesService {
    constructor(Databaseservice) {
        this.Databaseservice = Databaseservice;
    }
    async create(createCategoryDto) {
        return this.Databaseservice.categories.create({
            data: createCategoryDto,
        });
    }
    async findAll() {
        return this.Databaseservice.categories.findMany();
    }
    async findOne(id) {
        return this.Databaseservice.categories.findUnique({
            where: {
                id,
            },
        });
    }
    async update(id, updateCategoryDto) {
        return this.Databaseservice.categories.update({
            where: {
                id,
            },
            data: updateCategoryDto,
        });
    }
    async remove(id) {
        return this.Databaseservice.categories.delete({
            where: {
                id,
            },
        });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map