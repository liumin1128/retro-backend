import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  readonly nickname?: string;

  readonly avatarUrl?: string;

  readonly sex?: number;

  readonly sign?: number;

  readonly birthday?: Date;

  readonly position?: number;

  readonly company?: number;
}

export class RegisterUserDto {
  @IsNotEmpty()
  readonly phoneNumber: string;
  readonly password: string;
  readonly nickname: string;
  readonly avatarUrl?: string;
  readonly sex?: number;
  readonly sign?: number;
  readonly birthday?: Date;
  readonly position?: number;
  readonly company?: number;
}
