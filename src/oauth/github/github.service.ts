import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

const github = {
  client_id: '4b922c0f2d2d554dc42d',
  client_secret: '81da3ef6142f4893612396916908c575597a345a',
  scope: ['user'],
};

@Injectable()
export class GithubService {
  constructor(private httpService: HttpService) {}

  getOauthUrl(): string {
    const dataStr = new Date().valueOf();
    let url = 'https://github.com/login/oauth/authorize';
    url += `?client_id=${github.client_id}`;
    url += `&scope=${github.scope}`;
    url += `&state=${dataStr}`;
    return url;
  }

  // 文档地址
  // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842

  // 返回值示例
  // {"access_token":"e72e16c7e42f292c6912e7710c838347ae178b4a",
  // "scope":"repo,gist",
  // "token_type":"bearer"}
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

    //   错误返回
    //   {
    //     error: 'bad_verification_code',
    //     error_description: 'The code passed is incorrect or expired.',
    //     error_uri: 'https://docs.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code'
    //   }
  }

  // 返回值示例
  //   {
  //     "login": "Diamondtest",
  //     "id": 28478049,
  //     "avatar_url": "https://avatars0.githubusercontent.com/u/28478049?v=3",
  //     "gravatar_id": "",
  //     "url": "https://api.github.com/users/Diamondtest",
  //     "html_url": "https://github.com/Diamondtest",
  //     "followers_url": "https://api.github.com/users/Diamondtest/followers",
  //     "following_url": "https://api.github.com/users/Diamondtest/following{/other_user}",
  //     "gists_url": "https://api.github.com/users/Diamondtest/gists{/gist_id}",
  //     "starred_url": "https://api.github.com/users/Diamondtest/starred{/owner}{/repo}",
  //     "subscriptions_url": "https://api.github.com/users/Diamondtest/subscriptions",
  //     "organizations_url": "https://api.github.com/users/Diamondtest/orgs",
  //     "repos_url": "https://api.github.com/users/Diamondtest/repos",
  //     "events_url": "https://api.github.com/users/Diamondtest/events{/privacy}",
  //     "received_events_url": "https://api.github.com/users/Diamondtest/received_events",
  //     "type": "User",
  //     "site_admin": false,
  //     "name": null,
  //     "company": null,
  //     "blog": "",
  //     "location": null,
  //     "email": null,
  //     "hireable": null,
  //     "bio": null,
  //     "public_repos": 0,
  //     "public_gists": 0,
  //     "followers": 0,
  //     "following": 0,
  //     "created_at": "2017-05-06T08:08:09Z",
  //     "updated_at": "2017-05-06T08:16:22Z"
  // }
  getUserInfo(access_token: string): Promise<any> {
    return this.httpService
      .get(`https://api.github.com/user?access_token=${access_token}`)
      .pipe(map((response) => response.data))
      .toPromise();
  }
}
