import { Controller, Get } from '@nestjs/common';
import { Auth } from '../../common/decorators/auth.decorator';
import { UserRole } from '../auth/constants/user-role.enum';

@Controller('admin')
export class AdminController {
  @Get('dashboard')
  @Auth(UserRole.ADMIN)
  summary() {
    return {
      message: 'Administrative overview',
      stats: {
        totalSpas: 42,
        pendingApprovals: 3,
        flaggedBookings: 1,
      },
    };
  }
}
