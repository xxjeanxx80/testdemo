import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/requests/register-user.dto';
import { LoginDto } from './dto/requests/login.dto';
import {
  OAuthLoginDto,
  OAuthProvider,
} from './dto/requests/oauth-login.dto';
import { DEFAULT_ROLE, UserRole } from './constants/user-role.enum';

interface OAuthProfile {
  provider: OAuthProvider;
  providerSubject: string;
  email: string;
  fullName: string;
  role: UserRole;
  loyaltyPoints?: number;
}

@Injectable()
export class AuthService {
  private readonly mockDirectory: Record<string, OAuthProfile> = {
    [`${OAuthProvider.GOOGLE}:customer-token`]: {
      provider: OAuthProvider.GOOGLE,
      providerSubject: 'google-oauth2|customer-001',
      email: 'linh.customer@example.com',
      fullName: 'Linh Customer',
      role: UserRole.CUSTOMER,
      loyaltyPoints: 180,
    },
    [`${OAuthProvider.GOOGLE}:owner-token`]: {
      provider: OAuthProvider.GOOGLE,
      providerSubject: 'google-oauth2|owner-001',
      email: 'bao.owner@example.com',
      fullName: 'Bảo SpaOwner',
      role: UserRole.OWNER,
      loyaltyPoints: 40,
    },
    [`${OAuthProvider.FACEBOOK}:admin-token`]: {
      provider: OAuthProvider.FACEBOOK,
      providerSubject: 'facebook|admin-001',
      email: 'anh.admin@example.com',
      fullName: 'Anh Admin',
      role: UserRole.ADMIN,
    },
  };

  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<User> {
    const existing = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    if (!dto.password) {
      throw new ConflictException('Password is required for manual registration');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({
      email: dto.email,
      fullName: dto.fullName,
      password: hashedPassword,
      role: dto.role ?? DEFAULT_ROLE,
    });

    return this.usersRepo.save(user);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    return this.buildAuthResponse(user);
  }

  async oauthLogin(dto: OAuthLoginDto) {
    const profile = this.verifyOAuthToken(dto.provider, dto.providerToken);
    let user = await this.usersRepo.findOne({ where: { email: profile.email } });

    if (!user) {
      user = this.usersRepo.create({
        email: profile.email,
        fullName: profile.fullName,
        role: profile.role,
        loyaltyPoints: profile.loyaltyPoints ?? 0,
        oauthProvider: profile.provider,
        oauthSubject: profile.providerSubject,
      });
    } else {
      user.fullName = profile.fullName;
      user.oauthProvider = profile.provider;
      user.oauthSubject = profile.providerSubject;
      user.role = user.role ?? profile.role;
      if (profile.loyaltyPoints) {
        user.loyaltyPoints = profile.loyaltyPoints;
      }
    }

    const persisted = await this.usersRepo.save(user);
    return this.buildAuthResponse(persisted);
  }

  private buildAuthResponse(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        loyaltyPoints: user.loyaltyPoints,
      },
    };
  }

  private verifyOAuthToken(
    provider: OAuthProvider,
    providerToken: string,
  ): OAuthProfile {
    const profile = this.mockDirectory[`${provider}:${providerToken}`];
    if (!profile) {
      throw new UnauthorizedException('Invalid provider token');
    }
    return profile;
  }
}
