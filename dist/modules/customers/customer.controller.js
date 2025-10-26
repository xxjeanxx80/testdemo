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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const api_response_dto_1 = require("../../common/dto/api-response.dto");
const customer_service_1 = require("./customer.service");
const customer_entity_1 = require("./entities/customer.entity");
const create_customer_dto_1 = require("./dto/request/create-customer.dto");
const customer_response_dto_1 = require("./dto/response/customer-response.dto");
let CustomerController = class CustomerController {
    customerService;
    constructor(customerService) {
        this.customerService = customerService;
    }
    async findAll(req) {
        console.log('>>> Current user:', req.user);
        var listCustomers = await this.customerService.findAll();
        return {
            statusCode: 200,
            message: 'Success',
            data: listCustomers
        };
    }
    async findOne(id) {
        var customer = (0, class_transformer_1.plainToInstance)(customer_response_dto_1.CustomerResponseDto, await this.customerService.findOne(id), { excludeExtraneousValues: true });
        return {
            statusCode: 200,
            message: 'Successfully',
            data: customer
        };
    }
    async create(dto) {
        var customer = (0, class_transformer_1.plainToInstance)(customer_entity_1.Customer, dto, { excludeExtraneousValues: true });
        customer = await this.customerService.create(customer);
        console.log('customer: new object created', customer);
        return {
            statusCode: 200,
            message: 'Successfully',
            data: (0, class_transformer_1.plainToInstance)(customer_response_dto_1.CustomerResponseDto, customer, { excludeExtraneousValues: true })
        };
    }
    async update(id, dto) {
        var customer = (0, class_transformer_1.plainToInstance)(customer_entity_1.Customer, dto, { excludeExtraneousValues: true });
        var updatedCustomer = await this.customerService.update(id, customer);
        return {
            statusCode: 200,
            message: 'Successfully',
            data: (0, class_transformer_1.plainToInstance)(customer_response_dto_1.CustomerResponseDto, updatedCustomer, { excludeExtraneousValues: true })
        };
    }
    async remove(id) {
        await this.customerService.remove(id);
        return {
            statusCode: 200,
            message: 'Successfully',
            data: null
        };
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)('user'),
    (0, swagger_1.ApiOkResponse)({ type: (api_response_dto_1.ApiResponseDto) }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: (api_response_dto_1.ApiResponseDto) }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)('user'),
    (0, swagger_1.ApiOkResponse)({ type: (api_response_dto_1.ApiResponseDto) }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, auth_decorator_1.Auth)('user'),
    (0, swagger_1.ApiOkResponse)({ type: (api_response_dto_1.ApiResponseDto) }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)('user'),
    (0, swagger_1.ApiOkResponse)({ type: (api_response_dto_1.ApiResponseDto) }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "remove", null);
exports.CustomerController = CustomerController = __decorate([
    (0, swagger_1.ApiTags)('Customers'),
    (0, common_1.Controller)('customers'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map