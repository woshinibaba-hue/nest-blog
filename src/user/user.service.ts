import { HttpException, Injectable } from '@nestjs/common'
import { hash, verify } from 'argon2'
import { PrismaService } from './../prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private jwt: JwtService) {}

  // 登录
  async login(loginDto: LoginDto) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: loginDto.email,
      },
    })

    if (!(await verify(user.password, loginDto.password))) {
      throw new HttpException('账号或密码错误', 400)
    }

    // 生成token
    const token = await this.jwt.signAsync({ username: user.username, sub: user.id })
    delete user.password

    return {
      ...user,
      token,
    }
  }

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

  // 查询用户
  async find({ page = 1, size = 10 }) {
    // take 数据条数
    // skip 偏移量
    const data = await this.prisma.users.findMany({
      take: +size,
      skip: (page - 1) * size,
      select: {
        id: true,
        username: true,
        email: true,
        isBoss: true,
        github_id: true,
        github_url: true,
        password: false,
        mobile: true,
        avatar: true,
        status: true,
        auto: true,
        referral: true,
        qqInfo: true,
        unionid: true,
        createtime: true,
        updatetime: true,
      },
    })

    const meta = {
      total: await this.prisma.users.count(),
      page,
    }

    return { data, meta }
  }
}
