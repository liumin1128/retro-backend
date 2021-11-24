export class CreateRetroMessageDto {
  readonly user: string;
  readonly content: string;
}

export class UpdateRetroMessageDto {
  readonly user?: string;
  readonly content?: string;
  readonly status?: string;
}
