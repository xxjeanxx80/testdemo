import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/requests/register-user.dto';
import { LoginDto } from './dto/requests/login.dto';
export declare class AuthService {
    private usersRepo;
    private jwtService;
    constructor(usersRepo: Repository<User>, jwtService: JwtService);
    register(dto: RegisterUserDto): Promise<User>;
    validateUser(username: string, pass: string): Promise<User>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
