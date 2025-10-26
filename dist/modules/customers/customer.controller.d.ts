import { ApiResponseDto } from "../../common/dto/api-response.dto";
import { CustomerService } from "./customer.service";
import { Customer } from "./entities/customer.entity";
import { CreateCustomerDto } from "./dto/request/create-customer.dto";
import { CustomerResponseDto } from "./dto/response/customer-response.dto";
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    findAll(req: any): Promise<ApiResponseDto<Customer[]>>;
    findOne(id: number): Promise<ApiResponseDto<CustomerResponseDto | null>>;
    create(dto: CreateCustomerDto): Promise<ApiResponseDto<CustomerResponseDto>>;
    update(id: number, dto: CreateCustomerDto): Promise<ApiResponseDto<CustomerResponseDto>>;
    remove(id: number): Promise<ApiResponseDto<null>>;
}
