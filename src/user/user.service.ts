import { PrismaService } from './../prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { hash } from 'argon2'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // 注册用户
  async register(registerDto: RegisterDto) {
    const {
      username,
      email = null,
      password = null,
      mobile = null,
      referral = '这个人好懒，什么都没留下~',
      auto = 3,
      avatar = null,
      status = 1,
      github_id = null,
      github_url = null,
      qqInfo = null,
      unionid = null,
    } = registerDto

    const pwd = await hash(password)

    return await this.prisma.users.create({
      data: {
        username,
        email,
        password: pwd,
        mobile,
        referral,
        auto,
        avatar,
        status,
        github_id,
        github_url,
        qqInfo,
        unionid,
      },
    })
  }
}
