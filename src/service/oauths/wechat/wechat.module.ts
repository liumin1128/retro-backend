import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WchatController } from '@/service/oauths/wechat/wechat.controller';
import { WchatService } from '@/service/oauths/wechat/wechat.service';
import { OAuthModule } from '@/service/oauths/oauths.module';
import { UserModule } from '@/service/users/users.module';
import { AuthModule } from '@/service/auth/auth.module';
import { QiniuModule } from '@/utils/qiniu/qiniu.module';

@Module({
  imports: [HttpModule, OAuthModule, UserModule, QiniuModule, AuthModule],
  providers: [WchatService],
  controllers: [WchatController],
})
export class WchatModule {}
