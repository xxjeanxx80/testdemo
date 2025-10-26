import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { DEFAULT_ROLE, UserRole } from '../../constants/user-role.enum';

export class RegisterUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole = DEFAULT_ROLE;
}
