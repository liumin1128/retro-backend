export class CreateSeatDto {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly icon: string;
  readonly cover: string;
}

export class UpdateSeatDto {
  readonly name: string;
  readonly description: string;
  readonly icon: string;
  readonly cover: string;
  readonly tags: string[];
  readonly status: string;
  readonly disabled: boolean;
}
