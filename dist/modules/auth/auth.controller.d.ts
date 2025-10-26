import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/requests/register-user.dto';
import { LoginDto } from './dto/requests/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterUserDto): Promise<import("./entities/user.entity").User>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
