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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ProductsService = class ProductsService {
    constructor(databaseervice) {
        this.databaseervice = databaseervice;
    }
    async create(createProductDto) {
        return this.databaseervice.product.create({
            data: createProductDto,
        });
    }
    async findAll() {
        return this.databaseervice.product.findMany();
    }
    async findProductByName(name) {
        const products = await this.databaseervice.product.findMany({
            where: {
                name,
            },
        });
        if (!products || products.length === 0) {
            return { message: `Product with name '${name}' not found` };
        }
        return products;
    }
    async findOne(id) {
        return this.databaseervice.product.findUnique({
            where: {
                id,
            },
        });
    }
    async update(id, updateProductDto) {
        return this.databaseervice.product.update({
            where: {
                id,
            },
            data: updateProductDto,
        });
    }
    async remove(id) {
        return this.databaseervice.product.delete({
            where: {
                id,
            },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ProductsService);
//# sourceMappingURL=products.service.js.map