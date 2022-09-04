import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator'

import { IsExistRule } from '../../rules/is-exist-rule'

export class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @IsEmail({}, { message: '邮箱格式不合法' })
  @IsExistRule('users', { message: '邮箱已存在' })
  email?: string | null

  password?: string | null

  @IsExistRule('users', { message: '手机号已存在' })
  @IsMobilePhone()
  mobile?: string | null

  referral?: string | null
  auto?: number
  avatar?: string | null
  status?: number
  github_id?: number | null
  github_url?: string | null
  qqInfo?: string | null
  unionid?: string | null
}
