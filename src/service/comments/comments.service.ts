import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './comments.dto';
import { Comment, CommentDocument } from './comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentsModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentDocument> {
    const createdComment = new this.commentsModel(createCommentDto);
    return createdComment.save();
  }

  async findAll(): Promise<CommentDocument[]> {
    return this.commentsModel.find();
  }

  async findById(_id: string): Promise<CommentDocument> {
    return this.commentsModel.findById(_id);
  }
}
