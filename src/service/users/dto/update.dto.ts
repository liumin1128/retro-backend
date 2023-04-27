import { IsNotEmpty } from 'class-validator';

export default class UpdateUserInfoDto {
  @IsNotEmpty()
  readonly nickname?: string;
  readonly avatarUrl?: string;
  readonly sex?: number;
  readonly sign?: number;
  readonly birthday?: Date;
  readonly position?: number;
  readonly company?: number;
}
