import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

const github = {
  client_id: '4b922c0f2d2d554dc42d',
  client_secret: '81da3ef6142f4893612396916908c575597a345a',
  scope: ['user'],
};

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  getOAuthUrl(): string {
    const dataStr = new Date().valueOf();
    let url = 'https://github.com/login/oauth/authorize';
    url += `?client_id=${github.client_id}`;
    url += `&scope=${github.scope}`;
    url += `&state=${dataStr}`;
    console.log('url');
    console.log(url);
    return url;
  }

  // 返回值示例
  // {"access_token":"e72e16c7e42f292c6912e7710c838347ae178b4a",
  // "scope":"repo,gist",
  // "token_type":"bearer"}

  //   错误返回
  //   {
  //     error: 'bad_verification_code',
  //     error_description: 'The code passed is incorrect or expired.',
  //     error_uri: 'https://docs.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code'
  //   }
  getAccessToken(code: string): Promise<Record<string, string>> {
    const url = 'https://github.com/login/oauth/access_token';

    const params = {
      client_id: github.client_id,
      client_secret: github.client_secret,
      code,
    };

    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };

    return this.httpService
      .post(url, params, {
        headers,
      })
      .pipe(map((response) => response.data))
      .toPromise();
  }

  // 返回值示例
  // {
  //   login: 'liumin1128',
  //   id: 12379461,
  //   node_id: 'MDQ6VXNlcjEyMzc5NDYx',
  //   avatar_url: 'https://avatars.githubusercontent.com/u/12379461?v=4',
  //   gravatar_id: '',
  //   url: 'https://api.github.com/users/liumin1128',
  //   html_url: 'https://github.com/liumin1128',
  //   followers_url: 'https://api.github.com/users/liumin1128/followers',
  //   following_url: 'https://api.github.com/users/liumin1128/following{/other_user}',
  //   gists_url: 'https://api.github.com/users/liumin1128/gists{/gist_id}',
  //   starred_url: 'https://api.github.com/users/liumin1128/starred{/owner}{/repo}',
  //   subscriptions_url: 'https://api.github.com/users/liumin1128/subscriptions',
  //   organizations_url: 'https://api.github.com/users/liumin1128/orgs',
  //   repos_url: 'https://api.github.com/users/liumin1128/repos',
  //   events_url: 'https://api.github.com/users/liumin1128/events{/privacy}',
  //   received_events_url: 'https://api.github.com/users/liumin1128/received_events',
  //   type: 'User',
  //   site_admin: false,
  //   name: '本王今年八岁',
  //   company: '首席前端大祭司@singaporeair',
  //   blog: 'http://liumin.me',
  //   location: 'beijing',
  //   email: '970568830@qq.com',
  //   hireable: true,
  //   bio: '二次元fans，舞蹈区fans',
  //   twitter_username: null,
  //   public_repos: 95,
  //   public_gists: 1,
  //   followers: 51,
  //   following: 7,
  //   created_at: '2015-05-10T08:48:43Z',
  //   updated_at: '2021-04-10T09:45:18Z',
  //   private_gists: 2,
  //   total_private_repos: 3,
  //   owned_private_repos: 3,
  //   disk_usage: 371655,
  //   collaborators: 0,
  //   two_factor_authentication: false,
  //   plan: {
  //     name: 'pro',
  //     space: 976562499,
  //     collaborators: 0,
  //     private_repos: 9999
  //   }
  // }
  getUserInfo(access_token: string): Promise<any> {
    return this.httpService
      .get(`https://api.github.com/user?access_token=${access_token}`)
      .pipe(map((response) => response.data))
      .toPromise();
  }
}
