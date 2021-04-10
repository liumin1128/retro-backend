import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { GithubService } from './github.service';
import { OAuthService } from '../../database/oauth/oauth.service';

@Controller('/oauth/github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly oauthService: OAuthService,
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

      console.log(userInfo);

      this.oauthService.create({
        platform: 'github',
        data: userInfo,
      });

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
