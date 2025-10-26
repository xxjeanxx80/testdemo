import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  const buildContext = (user: any): ExecutionContext => ({
    getClass: () => function TestClass() {},
    getHandler: () => function testHandler() {},
    switchToHttp: () => ({
      getRequest: () => ({ user }),
    }),
  } as unknown as ExecutionContext);

  it('allows access when role matches', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(['admin']),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    const canActivate = guard.canActivate(buildContext({ role: 'admin' }));

    expect(canActivate).toBe(true);
  });

  it('denies access for missing role', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(['owner']),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    const canActivate = guard.canActivate(buildContext({ role: 'customer' }));

    expect(canActivate).toBe(false);
  });

  it('denies access when request has no user', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(['admin']),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    const canActivate = guard.canActivate(buildContext(undefined));

    expect(canActivate).toBe(false);
  });
});
