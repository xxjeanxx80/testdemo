import { Customer } from "./entities/customer.entity";
import { Repository } from "typeorm";
export declare class CustomerService {
    private customerRepository;
    constructor(customerRepository: Repository<Customer>);
    findAll(): Promise<Customer[]>;
    findOne(id: number): Promise<Customer | null>;
    create(customer: Customer): Promise<Customer>;
    update(id: number, customer: Customer): Promise<Customer | null>;
    remove(id: number): Promise<void>;
}
