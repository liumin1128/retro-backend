export class CreateUserToSeatDto {
  readonly user: string;
  readonly seat: string;
  readonly date: string;
}

export class DeleteUserToSeatDto {
  readonly user: string;
  readonly seat: string;
  readonly date: string;
}
