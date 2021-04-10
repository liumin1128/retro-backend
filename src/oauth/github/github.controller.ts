import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { GithubService } from './github.service';
import { OAuthService } from '../../database/oauth/oauth.service';
import { UserService } from '../../database/user/user.service';
import { UserDocument } from '../../database/user/schemas/user.schema';
import { OAuthDocument } from '../../database/oauth/schemas/oauth.schema';

@Controller('/oauth/github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly oauthService: OAuthService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @Redirect()
  login(): { url: string; statusCode: number } {
    return { url: this.githubService.getOAuthUrl(), statusCode: 301 };
  }

  @Get('/callback')
  async callback(@Query('code') code: string): Promise<string> {
    try {
      const {
        error,
        error_description,
        access_token,
      } = await this.githubService.getAccessToken(code);

      if (error !== undefined) {
        return error_description;
      }

      const userInfo = await this.githubService.getUserInfo(access_token);

      let user: UserDocument;
      let oauth: OAuthDocument;

      oauth = await this.oauthService.findOne({
        platform: 'github',
        uuid: userInfo.id,
      });

      // 检查第三方信息，不存在就创建新的
      if (!oauth) {
        oauth = await this.oauthService.create({
          uuid: userInfo.id,
          platform: 'github',
          data: userInfo,
        });
      } else {
        // update
      }

      // 检查用户是否存在，不存在就创建新的
      let needCreateNewUser = false;

      if (!oauth.user) {
        needCreateNewUser = true;
      } else {
        user = await this.userService.findById(oauth.user._id);
        if (!user) {
          needCreateNewUser = true;
        }
      }

      if (needCreateNewUser) {
        const { avatar_url, name, login } = userInfo;
        // const avatarUrl = await fetchToQiniu(avatar_url);
        user = await this.userService.create({
          username: login,
          avatarUrl: avatar_url,
          nickname: name || login,
        });
        // 由于创建了新用户，需要保存新的用户信息
        await oauth.update({ user });
      }

      console.log('user');
      console.log(user);

      return 'ok';
    } catch (error) {
      console.log(error);
      return error.message;
    }

    //     .subscribe(
    //   (response) => {
    //     console.log(response.data);
    //     res.body = 'xxx';
    //     return 'xxxx';
    //   },
    //   (error) => console.log(error),
    // );
  }
}
