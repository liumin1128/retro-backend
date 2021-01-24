import { Injectable } from '@nestjs/common';
import cheerio = require('cheerio');
import axios from 'axios';
// import request from '@/utils/request';
import { Item } from './interfaces/analyse.interface';

const URL = 'http://www.stats.gov.cn';

const request = axios.create({ baseURL: URL });

@Injectable()
export class AnalyseService {
  private readonly items: Item[] = [{ title: 'ssssss' }];

  async findAll(): Promise<Item[]> {
    try {
      const data = await request.get('/tjsj/sjjd/');
      const $ = cheerio.load(data.data);
      const list: Item[] = [];
      function getVlue() {
        const title = $(this).find('span a font').text();
        if (title.length === 0) return;
        const desc = $(this).find('p.cont_p').text();

        const url = $(this).find('span a').attr('href');
        const createdAt = $(this).find('span font.cont_tit02').text();
        list.push({
          title,
          createdAt,
          url,
          desc,
        });
      }
      await $('ul.center_list_cont li').map(getVlue);
      console.log("list: ", list);
      return list;
    } catch (error) {
      console.log('error', error);
    }
    return this.items;
  }
}
