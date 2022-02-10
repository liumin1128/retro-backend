export const lookupUser = [
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
];
