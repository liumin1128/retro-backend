export class CreateOrganizationDto {
  readonly owner: string;
  readonly users: string[];
  readonly name: string;
  readonly icon: string;
  readonly description: string;
}
