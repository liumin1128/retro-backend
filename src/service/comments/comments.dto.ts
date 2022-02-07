export class CreateCommentDto {
  readonly user: string;
  readonly content: string;
  readonly object: string;
  readonly objectModel: 'Dynamic' | 'News' | 'Comment' | 'RetroMessage';
}
