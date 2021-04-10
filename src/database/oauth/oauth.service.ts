import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOAuthDto } from './dto/create.dto';
import { OAuth, OAuthDocument } from './schemas/oauth.schema';

@Injectable()
export class OAuthService {
  constructor(
    @InjectModel(OAuth.name) private readonly oauthModel: Model<OAuthDocument>,
  ) {}

  async create(createOAuthDto: CreateOAuthDto): Promise<OAuth> {
    const createdOAuth = new this.oauthModel(createOAuthDto);
    return createdOAuth.save();
  }

  async findAll(): Promise<OAuth[]> {
    return this.oauthModel.find().exec();
  }
}
