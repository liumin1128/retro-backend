import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCommentDto, ReplyCommentDto } from './comments.dto';
import { Comment, CommentDocument } from './comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentsModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentDocument> {
    const createdComment = new this.commentsModel(createCommentDto);
    await createdComment.save();
    await createdComment.populate('user');
    await createdComment.populate({
      path: 'replyTo',
      populate: { path: 'user' },
    });
    return createdComment;
  }

  async findAll(object: string): Promise<CommentDocument[]> {
    const data = await this.commentsModel.aggregate([
      {
        $match: {
          $and: [{ object: new Types.ObjectId(object) }, { commentTo: null }],
        },
      },

      // 聚合查询出回复
      {
        $lookup: {
          from: 'comments',
          let: { commentTo: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$$commentTo', '$commentTo'] } } },

            // 聚合查询回复对象具体内容
            {
              $lookup: {
                from: 'comments',
                let: { replyTo: '$replyTo' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$$replyTo', '$_id'] } } },

                  // 聚合查询回复对象用户信息
                  {
                    $lookup: {
                      from: 'users',
                      let: { user: '$user' },
                      pipeline: [
                        { $match: { $expr: { $eq: ['$$user', '$_id'] } } },
                        {
                          $project: {
                            _id: 1,
                            nickname: 1,
                            avatarUrl: 1,
                          },
                        },
                      ],
                      as: 'user',
                    },
                  },
                  {
                    $addFields: {
                      user: { $first: '$user' },
                    },
                  },
                ],
                as: 'replyTo',
              },
            },
            {
              $addFields: {
                replyTo: { $first: '$replyTo' },
              },
            },

            // 聚合查询回复对象用户信息
            {
              $lookup: {
                from: 'users',
                let: { user: '$user' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$$user', '$_id'] } } },
                  {
                    $project: {
                      _id: 1,
                      nickname: 1,
                      avatarUrl: 1,
                    },
                  },
                ],
                as: 'user',
              },
            },
            {
              $addFields: {
                user: { $first: '$user' },
              },
            },
          ],
          as: 'comments',
        },
      },

      // 聚合查询用户信息
      {
        $lookup: {
          from: 'users',
          let: { user: '$user' },
          pipeline: [
            { $match: { $expr: { $eq: ['$$user', '$_id'] } } },
            {
              $project: {
                _id: 1,
                nickname: 1,
                avatarUrl: 1,
              },
            },
          ],
          as: 'user',
        },
      },
      {
        $addFields: {
          user: { $first: '$user' },
        },
      },
    ]);

    return data;
  }

  async findById(_id: string): Promise<CommentDocument> {
    return this.commentsModel.findById(_id);
  }
}
