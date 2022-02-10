import { Types } from 'mongoose';
import { lookupUser } from './user';
import { lookupLikeCount, lookupLikeStatus } from './like';

export const lookupComments = (user) => {
  return [
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
                ...lookupUser,
              ],
              as: 'replyTo',
            },
          },
          {
            $addFields: {
              replyTo: { $first: '$replyTo' },
            },
          },

          ...lookupLikeCount,

          ...lookupLikeStatus(user),

          // 聚合查询回复对象用户信息
          ...lookupUser,
        ],
        as: 'comments',
      },
    },
  ];
};

export const getCommentsPipline = (object: string, user: string): any[] => {
  return [
    {
      $match: {
        $and: [{ object: new Types.ObjectId(object) }, { commentTo: null }],
      },
    },

    ...lookupComments(user),

    ...lookupUser,

    ...lookupLikeCount,

    ...lookupLikeStatus(user),
  ];
};
