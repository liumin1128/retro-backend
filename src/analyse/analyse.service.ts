import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/analyse.interface';

@Injectable()
export class AnalyseService {
  private readonly items: Item[] = [{ title: 'ssssss' }];

  findAll(): Item[] {
    return this.items;
  }
}
