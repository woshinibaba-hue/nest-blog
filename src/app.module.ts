import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'

import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    PrismaModule,
    // 将 config模块注册为全局模块
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
