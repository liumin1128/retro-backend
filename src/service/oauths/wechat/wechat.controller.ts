import { Controller, Get, Query, Redirect } from '@nestjs/common';
import {
  WchatService,
  GetUserInfoResponse,
  GetAccessTokenResponse,
} from '@/service/oauths/wechat/wechat.service';
import { OAuthsService } from '@/service/oauths/oauths.service';
import { UsersService } from '@/service/users/users.service';
import { QiniuService } from '@/utils/qiniu/qiniu.service';
import { UserDocument } from '@/service/users/schemas/users.schema';
import { OAuthDocument } from '@/service/oauths/schemas/oauths.schema';
import { AuthService } from '@/service/auth/auth.service';

@Controller('/oauth/wechat')
export class WchatController {
  constructor(
    private readonly wechatService: WchatService,
    private readonly oauthService: OAuthsService,
    private readonly userService: UsersService,
    private readonly qiniuService: QiniuService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Redirect()
  login(): { url: string; statusCode: number } {
    return { url: this.wechatService.getOAuthUrl(), statusCode: 301 };
  }

  @Get('/callback')
  @Redirect()
  async callback(
    @Query('code') code: string,
  ): Promise<{ url: string; statusCode: number }> {
    try {
      const data: GetAccessTokenResponse =
        await this.wechatService.getAccessToken(code);
      console.log('data');
      console.log(data);
      const { access_token, openid, unionid } = data;
      if (!access_token) {
        console.log('微信获取access_token失败');
        return;
      }

      let user: UserDocument;
      let oauth: OAuthDocument;

      oauth = await this.oauthService.findOne({
        platform: 'wechat',
        uuid: unionid || openid,
      });

      // 检查第三方信息，不存在就创建新的
      if (!oauth) {
        const userInfo: GetUserInfoResponse =
          await this.wechatService.getUserInfo(access_token, openid);

        console.log('userInfo');
        console.log(userInfo);

        const { nickname, headimgurl } = userInfo;

        const uuid: string = openid;

        const avatarUrl = await this.qiniuService.fetchToQiniu(headimgurl);

        user = await this.userService.create({
          username: uuid,
          avatarUrl: avatarUrl,
          nickname: nickname,
        });

        oauth = await this.oauthService.create({
          uuid: uuid,
          platform: 'wechat',
          data: userInfo,
          user: user,
        });
      }

      const token = await this.authService.login({ _id: oauth.user._id });

      return {
        url: `${process.env.FRONT_DOMAIN}:${process.env.FRONT_PORT}/#/login/oauth?token=${token}`,
        statusCode: 301,
      };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}