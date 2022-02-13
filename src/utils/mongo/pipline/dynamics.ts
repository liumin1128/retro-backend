import { lookupUser } from './user';
import { lookupLikeCount, lookupLikeStatus } from './like';
import { lookupCommentCount } from './comments';

export const getDynamicsPipline = (user: string): any[] => {
  return [
    {
      $sort: {
        createdAt: -1,
      },
    },

    ...lookupUser,

    ...lookupLikeCount,

    ...lookupCommentCount,

    ...lookupLikeStatus(user),
  ];
};
