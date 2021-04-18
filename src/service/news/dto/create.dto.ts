import { IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
  readonly title: string;
  readonly json: string;
  readonly html: string;
  readonly appName: string;
  readonly appCode: string;
  readonly catLabel1: string;
  readonly catLabel2: string;
  readonly url: string;
  readonly cover: string;
  readonly content: string;
  readonly showHtml: boolean;
  readonly tags: string[];
  readonly photos: string[];
  readonly sourceData: any;
}
