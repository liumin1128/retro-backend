export default class UpdateUserInfoDto {
  readonly nickname?: string;
  readonly avatarUrl?: string;
  readonly sex?: number;
  readonly sign?: string;
  readonly birthday?: Date;
  readonly position?: string;
  readonly company?: string;
}

export class AdminUpdateUserInfoDto {
  readonly nickname?: string;
  readonly tags?: string;
  readonly index?: number;
}
