import { IsNotEmpty } from 'class-validator';

export class CreateOAuthDto {
  @IsNotEmpty()
  readonly platform: string;

  @IsNotEmpty()
  readonly data: any;
}
