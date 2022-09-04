import { UserService } from './user.service'
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userServer: UserService) {}

  // 注册
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.userServer.register(registerDto)
  }

  // 查询用户
  @Get()
  async find(@Query() query: any) {
    return await this.userServer.find(query)
  }
}
