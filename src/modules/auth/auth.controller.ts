import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/requests/register-user.dto';
import { LoginDto } from './dto/requests/login.dto';
import { OAuthLoginDto } from './dto/requests/oauth-login.dto';
import { Auth } from '../../common/decorators/auth.decorator';
import { UserRole } from './constants/user-role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('oauth')
  async oauth(@Body() dto: OAuthLoginDto) {
    return this.authService.oauthLogin(dto);
  }

  @Get('me')
  @Auth(UserRole.CUSTOMER, UserRole.OWNER, UserRole.ADMIN)
  me(@Req() req: any) {
    return req.user;
  }
}
