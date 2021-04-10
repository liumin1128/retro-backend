import { IsNotEmpty } from 'class-validator';

export class CreateOAuthDto {
  @IsNotEmpty()
  readonly uuid: string;

  @IsNotEmpty()
  readonly platform: string;

  @IsNotEmpty()
  readonly data: any;
}

export class FindOneOAuthDto {
  @IsNotEmpty()
  readonly uuid: string;

  @IsNotEmpty()
  readonly platform: string;
}

export class UpdateUserOAuthDto {
  @IsNotEmpty()
  readonly user: any;
}
