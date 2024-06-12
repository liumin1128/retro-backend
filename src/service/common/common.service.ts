import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';

@Injectable()
export class CommonService {
  constructor(private readonly httpService: HttpService) {}

  get(url: string) {
    return lastValueFrom<any>(
      this.httpService.get(url).pipe(
        map((response: any) => {
          return response.data;
        }),
      ),
    );
  }

  async getUrlMetadata(url: string): Promise<{
    title: string;
    description: string;
    icon: string;
    url: string;
  }> {
    const response = await this.get(url);
    const $ = cheerio.load(response);
    const title = $('head > title').text();
    const description = $('head > meta[name="description"]').attr('content');

    const iconLink =
      $('head > link[rel="icon"],head > link[rel="shortcut icon"]').attr(
        'href',
      ) || $('head > link[rel="shortcut icon"]').attr('href');
    console.log('iconLink');
    console.log(iconLink);
    let icon = iconLink;
    if (iconLink && !iconLink.startsWith('http')) {
      const urlObject = new URL(url);
      icon = urlObject.origin + iconLink;
    }

    return { title, description, icon, url: decodeURIComponent(url) };
  }
}
