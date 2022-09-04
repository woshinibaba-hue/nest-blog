import { IsEmail, IsNotEmpty } from 'class-validator'
import { IsExistRule } from '@/rules/is-exist-rule'

export class LoginDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确 ' })
  @IsExistRule('users', { message: '当前邮箱未注册' }, true)
  email: string

  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}
