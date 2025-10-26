import { IsEnum, IsString } from 'class-validator';

export enum OAuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export class OAuthLoginDto {
  @IsEnum(OAuthProvider)
  provider: OAuthProvider;

  @IsString()
  providerToken: string;
}
