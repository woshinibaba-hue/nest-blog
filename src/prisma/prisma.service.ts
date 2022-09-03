import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly config: ConfigService) {
    super(
      config.get('NODE_ENV') === 'production'
        ? {
            log: ['query'],
          }
        : {},
    )
  }
}
