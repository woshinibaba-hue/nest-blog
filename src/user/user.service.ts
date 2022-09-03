import { PrismaService } from './../prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { hash } from 'argon2'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // 注册用户
  async register(registerDto: RegisterDto) {
    const password = await hash(registerDto.password)

    return await this.prisma.users.create({
      // 需要返回给客户端的数据
      select: {
        id: true,
        email: true,
        mobile: true,
        avatar: true,
        referral: true,
      },
      // 需要存入数据库的数据
      data: { ...registerDto, password },
    })
  }
}
