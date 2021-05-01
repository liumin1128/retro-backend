export class CreateCommentDto {
  readonly content: string;
  readonly object: string;
  readonly objectModel: 'News' | 'Comment';
}
