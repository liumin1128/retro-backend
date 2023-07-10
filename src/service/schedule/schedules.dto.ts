export class CreateScheduleDto {
  readonly user: string;
  readonly date: number;
  readonly status: string;
  readonly comment?: string;
}
